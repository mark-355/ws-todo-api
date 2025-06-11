module.exports = (fieldsRequired) => {
    return (req, res, next) => {
        //tableau pour stocker les champs manquants
        const missingFields = [];
        //parcours des champs requis
        fieldsRequired.forEach((field) => {
            //si le champ n'est pas présent dans le corps de la requête, il est ajouté au tableau des champs manquants
            if (!req.body[field]) {
                missingFields.push(field);
            }
        });
        //si des champs sont manquants, une réponse avec le statut 400 (Bad Request) est renvoyée
        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Missing required fields: ${missingFields.join(', ')}`,
            });
        }
        //si tous les champs requis sont présents, la requête est passée au middleware suivant
        next();
    }
}