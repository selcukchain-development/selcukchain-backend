const express = require('express');
const router = express.Router();
const joinController = require('../controllers/joinController');

// Yeni katılım kaydı oluştur
router.post('/', joinController.createJoin);

// Tüm katılım kayıtlarını getir
router.get('/', joinController.getAllJoins);

// Belirli bir katılım kaydını ID'ye göre getir
router.get('/:id', joinController.getJoinById);

// Belirli bir katılım kaydını güncelle
router.put('/:id', joinController.updateJoin);

// Belirli bir katılım kaydını sil
router.delete('/:id', joinController.deleteJoin);

module.exports = router;
