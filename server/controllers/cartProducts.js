const db = require("../database/index");
const jwt = require('jsonwebtoken');
const { sequelize } = require('../database/index');

const addToCart = (req, res) => {
    const { productId } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: "Non autorisé - Token manquant" });

    const userId = jwt.verify(token, 'ascefbth,plnihcdxuwy').id;

    sequelize.transaction().then(transaction => {
        db.products.findByPk(productId, { transaction })
            .then(product => {
                if (!product) throw new Error("Produit non trouvé");

                return db.cart.findOrCreate({
                    where: { UserId: userId },
                    defaults: { totalItems: 0, totalAmount: 0 },
                    transaction
                }).then(([cart]) => {
                    return db.CartProducts.findOrCreate({
                        where: { CartId: cart.id, ProductId: productId },
                        defaults: { quantity: 1, priceAtPurchase: product.price },
                        transaction
                    }).then(([cartProduct, created]) => {
                        if (!created) {
                            return cartProduct.update({
                                quantity: cartProduct.quantity + 1
                            }, { transaction });
                        }
                        return cartProduct;
                    }).then((cartProduct) => {
                        cart.totalItems += 1;
                        cart.totalAmount = (parseFloat(cart.totalAmount) + parseFloat(product.price)).toString();
                        return cart.save({ transaction });
                    });
                });
            })
            .then(() => transaction.commit())
            .then(() => res.status(200).json({ message: "Produit ajouté au panier" }))
            .catch(error => {
                transaction.rollback();
                console.error("Erreur détaillée:", error);
                res.status(500).json({ message: error.message });
            });
    });
};

const removeFromCart = (req, res) => {
    const { productId } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: "Non autorisé - Token manquant" });

    const userId = jwt.verify(token, 'ascefbth,plnihcdxuwy').id;

    sequelize.transaction().then(transaction => {
        return db.cart.findOne({ 
            where: { UserId: userId },
            transaction 
        })
        .then(cart => {
            if (!cart) throw new Error("Panier non trouvé");

            return db.CartProducts.findOne({
                where: { 
                    CartId: cart.id,
                    ProductId: productId 
                },
                transaction
            })
            .then(cartProduct => {
                if (!cartProduct) throw new Error("Produit non trouvé dans le panier");

                return db.products.findByPk(productId, { transaction })
                    .then(product => {
                        // Calculer les nouvelles valeurs
                        const newTotalItems = Math.max(0, cart.totalItems - cartProduct.quantity);
                        const newTotalAmount = Math.max(0, 
                            parseFloat(cart.totalAmount) - 
                            (parseFloat(product.price) * cartProduct.quantity)
                        ).toString();
                        
                        // Mettre à jour le panier avec les nouvelles valeurs
                        return Promise.all([
                            cart.update({
                                totalItems: newTotalItems,
                                totalAmount: newTotalAmount
                            }, { transaction }),
                            cartProduct.destroy({ transaction })
                        ]);
                    });
            });
        })
        .then(() => transaction.commit())
        .then(() => res.status(200).json({ message: "Produit retiré du panier" }))
        .catch(error => {
            transaction.rollback();
            console.error("Erreur détaillée:", error);
            res.status(500).json({ message: error.message });
        });
    });
};
module.exports = { addToCart, removeFromCart };