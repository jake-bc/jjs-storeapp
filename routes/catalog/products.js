var express = require('express');
var router = express.Router();
var B = require('../../config/keys').B

router.get("/:product_id", (req, res) => {
    var product_id = req.params.product_id;//gets xavg234
    B.get('/catalog/products/'+product_id+'/variants?include_fields=calculated_price,inventory_level,sku,option_values,image_url')
    .then(data => res.json(data))
    .catch((error) => {
        console.log('error: ', error)
        return res.status(404).json({ _err: "No Products Found With ID" });
      })
});

module.exports = router;