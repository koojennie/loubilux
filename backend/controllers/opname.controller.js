const { Opname, Product } = require('../models');


// Generate Opname ID with format OP-000001
const generateOpnameId = async () => {
  const lastOpname = await Opname.findOne({
    order: [['createdAt', 'DESC']],
    attributes: ['opnameId'],
  });
  let nextNumber = 1;
  if (lastOpname && lastOpname.opnameId) {
    const match = lastOpname.opnameId.match(/OP-(\d+)/);
    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }
  return `OP-${String(nextNumber).padStart(5, '0')}`;
};

exports.getGenerateOpnameId = async (req, res) => {
  try {
    const opnameId = await generateOpnameId();

    res.json({
      message: 'Success Generate OpnameId',
      data: opnameId,
    });

  } catch (error) {
    res.status(500).json({ message: 'Error generate opnameId', error: err.message });

  }
}

exports.createOpname = async (req, res) => {
    try {
        const { opnameId, productId, physicalStock, note } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const recordedStock = product.quantity;
        const difference = physicalStock - recordedStock;

        // const opnameId = await generateOpnameId();

        const opname = await Opname.create({
            opnameId,
            productId,
            recordedStock,
            physicalStock,
            difference,
            note
        });

        // Optional update
        product.quantity = physicalStock;
        await product.save();

        return res.status(201).json({ message: 'Opname created', data: opname });
    } catch (err) {
        res.status(500).json({ message: 'Error creating opname', error: err.message });
    }
};

exports.getAllOpnames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Get sortBy and orderBy from query, default to opnameDate and DESC
    const sortBy = req.query.sortBy || 'opnameDate';
    const orderBy = req.query.orderBy && ['ASC', 'DESC'].includes(req.query.orderBy.toUpperCase())
      ? req.query.orderBy.toUpperCase()
      : 'DESC';

    // Search query
    const searchQuery = req.query.searchQuery || '';

    // Build where clause for search
    const where = {};
    if (searchQuery) {
      where[Op.or] = [
        { opnameId: { [require('sequelize').Op.like]: `%${searchQuery}%` } },
        { note: { [require('sequelize').Op.like]: `%${searchQuery}%` } }
      ];
    }

    const { count, rows: opnames } = await Opname.findAndCountAll({
      where,
      include: [
        {
          model: Product,
          attributes: ['name'],
          where: searchQuery
            ? { name: { [require('sequelize').Op.like]: `%${searchQuery}%` } }
            : undefined,
          required: false
        }
      ],
      order: [[sortBy, orderBy]],
      limit,
      offset
    });

    // Map opnames to replace 'Product' with 'productName'
    const formattedOpnames = opnames.map(opname => {
      const opnameData = opname.toJSON();
      return {
        ...opnameData,
        productName: opnameData.Product ? opnameData.Product.name : null
      };
    });

    res.json({
      message: 'All stock opnames',
      data: formattedOpnames,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching opnames', error: err.message });
  }
};

exports.getOpnameById = async (req, res) => {
  try {
    const { id } = req.params;
    const opname = await Opname.findByPk(id, {
      include: [
        { model: Product, attributes: ['name', 'quantity'] }
      ]
    });
    if (!opname) return res.status(404).json({ message: 'Opname not found' });

    res.json({ message: 'Opname details', data: opname });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching opname details', error: err.message });
  }
};

exports.updateOpname = async (req, res) => {
  try {
    const { id } = req.params;
    const { physicalStock, note } = req.body;

    const opname = await StockOpname.findByPk(id, { include: [Product] });
    if (!opname) return res.status(404).json({ message: 'Opname not found' });

    const recordedStock = opname.recordedStock;
    const difference = physicalStock - recordedStock;

    opname.physicalStock = physicalStock;
    opname.difference = difference;
    opname.note = note;

    await opname.save();

    const product = await Product.findByPk(opname.productId);
    if (product) {
      product.quantity = physicalStock;
      await product.save();
    }

    return res.json({ message: 'Opname updated', data: opname });
  } catch (err) {
    res.status(500).json({ message: 'Error updating opname', error: err.message });
  }
};

exports.deleteOpname = async (req, res) => {
  try {
    const { id } = req.params;
    const opname = await StockOpname.findByPk(id);
    if (!opname) return res.status(404).json({ message: 'Opname not found' });

    await opname.destroy();

    res.json({ message: 'Opname deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting opname', error: err.message });
  }
};


