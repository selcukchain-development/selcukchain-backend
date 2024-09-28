const Join = require('../models/Join');

// Yeni bir katılım kaydı oluştur
exports.createJoin = async (req, res) => {
  try {
    const newJoin = new Join(req.body);
    const savedJoin = await newJoin.save();
    res.status(201).json({
      success: true,
      data: savedJoin
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Tüm katılım kayıtlarını getir
exports.getAllJoins = async (req, res) => {
  try {
    const joins = await Join.find();
    res.status(200).json({
      success: true,
      count: joins.length,
      data: joins
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Belirli bir katılım kaydını ID'ye göre getir
exports.getJoinById = async (req, res) => {
  try {
    const join = await Join.findById(req.params.id);
    if (!join) {
      return res.status(404).json({
        success: false,
        error: 'Katılım kaydı bulunamadı'
      });
    }
    res.status(200).json({
      success: true,
      data: join
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Belirli bir katılım kaydını güncelle
exports.updateJoin = async (req, res) => {
  try {
    const join = await Join.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!join) {
      return res.status(404).json({
        success: false,
        error: 'Katılım kaydı bulunamadı'
      });
    }
    res.status(200).json({
      success: true,
      data: join
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Belirli bir katılım kaydını sil
exports.deleteJoin = async (req, res) => {
  try {
    const join = await Join.findByIdAndDelete(req.params.id);
    if (!join) {
      return res.status(404).json({
        success: false,
        error: 'Katılım kaydı bulunamadı'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
