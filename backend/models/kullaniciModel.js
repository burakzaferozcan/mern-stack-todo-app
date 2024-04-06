const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Sema = mongoose.Schema;
const kullaniciSema = new Sema({
  email: {
    type: String,
    required: [true, "Email zorunlu olarak girilmelidir."],
    unique: true,
  },
  parola: {
    type: String,
    required: [true, "Parola zorunlu olarak girilmelidir."],
  },
});
kullaniciSema.statics.signup = async function (email, parola) {
  if (!email || !parola) {
    throw Error("Alanlar boş geçilemez");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email adresi kurallara uygun değil");
  }
  if (!validator.isStrongPassword(parola)) {
    throw Error(
      "Parola yeterince güçlü değil. En az bir büyük harf, bir özel karakter, bir rakam ve en az 8 karakter olmalı"
    );
  }
  const kontrolKullanici = await this.findOne({ email });
  if (kontrolKullanici) {
    throw new Error("Email zaten kullanılıyor.");
  }
  const salt = await bcrypt.genSalt(10);
  const sifrelenmisParola = await bcrypt.hash(parola, salt);
  const kullanici = await this.create({ email, parola: sifrelenmisParola });
  return kullanici;
};
kullaniciSema.statics.login = async function (email, parola) {
  if (!email || !parola) {
    throw Error("Alanlar boş geçilemez");
  }
  const kullanici = await this.findOne({ email });
  if (!kullanici) {
    throw new Error("Email adresi ile ilgili kullanıcı bulunamadı.");
  }
  const parolaKontrol = await bcrypt.compare(parola, kullanici.parola);

  if (!parolaKontrol) {
    throw new Error("Parola yanlış.");
  }
  return kullanici;
};
module.exports = mongoose.model("Kullanici", kullaniciSema);
