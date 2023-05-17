import Product from "../models/productsModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const { company, featured, name, sort, select } = req.query;
    const queryObject = {};

    if (company) {
      queryObject.company = company;
    }

    if (featured) {
      queryObject.featured = featured
    }

    if (name) {
      queryObject.name = { $regex: name, $options: 'i', };
    }

    let apiData = Product.find(queryObject);

    if (sort) {
      // let sortFix = sort.replace(",", " ");
      let selectFix = sort.split(',').join(' ');
      apiData = apiData.sort(sortFix);
    }

    if (select) {
      let selectFix = select.split(',').join(' ');
      apiData = apiData.select(selectFix)
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);


    const Products = await apiData;
    res.status(200).json({
      success: true,
      totalProducts: Products.length,
      Products,
    })
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};