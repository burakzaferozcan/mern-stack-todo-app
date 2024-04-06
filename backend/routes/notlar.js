const express = require("express");
const {
  notOlustur,
  notlarGetir,
  notGetir,
  notSil,
  notGuncelle,
} = require("../controllers/notController");
const authKOntrol = require("../middlewares/authKontrol");
const router = express.Router();
router.use(authKOntrol);
router.get("/", notlarGetir);
//listele

router.get("/:id", notGetir);
//ekle
router.post("/", notOlustur);

router.delete("/:id", notSil);
//güncelle
router.patch("/:id", notGuncelle);
module.exports = router;
