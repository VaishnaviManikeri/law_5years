const Gallery = require('../models/Gallery');

/* ================= CREATE GALLERY ITEM ================= */
exports.createGalleryItem = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // ✅ Cloudinary image URL
    const imageUrl = req.file ? req.file.path : '';

    const galleryItem = new Gallery({
      title,
      description,
      category,
      image: imageUrl, // IMPORTANT: save Cloudinary URL
      isActive: true,
    });

    await galleryItem.save();

    res.status(201).json({
      success: true,
      data: galleryItem,
    });
  } catch (error) {
    console.error('Create Gallery Error:', error);
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET ALL ACTIVE (PUBLIC) ================= */
exports.getAllGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET BY ID ================= */
exports.getGalleryItemById = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= UPDATE GALLERY ITEM ================= */
exports.updateGalleryItem = async (req, res) => {
  try {
    const updates = {
      ...req.body,
      updatedAt: Date.now(),
    };

    // ✅ If new image uploaded, replace with Cloudinary URL
    if (req.file) {
      updates.image = req.file.path;
    }

    const item = await Gallery.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= DELETE (SOFT DELETE) ================= */
exports.deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    res.json({
      success: true,
      message: 'Gallery item deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= ADMIN: GET ALL ================= */
exports.getAllGalleryItemsAdmin = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
