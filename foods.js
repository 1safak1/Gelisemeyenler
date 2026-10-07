// ==============================================================================
// NutriFit Kapsamlı Türk Besin & Yemek Veritabanı
// Tüm değerler 100g (veya belirtilen adet/ölçek biriminde) baz alınarak hazırlanmıştır.
// ==============================================================================

const INITIAL_FOOD_DATABASE = [
  // ----------------------------------------------------------------------------
  // 1. ET, KÜMES HAYVANLARI & ŞARKÜTERİ
  // ----------------------------------------------------------------------------
  { id: 'f1', name: 'Tavuk Göğsü (Izgara / Haşlanmış, Pişmiş)', category: 'Et & Kümes Hayvanları', calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, unit: 'g', defaultAmount: 150 },
  { id: 'f2', name: 'Tavuk Göğsü (Çiğ)', category: 'Et & Kümes Hayvanları', calories: 110, protein: 23.0, carbs: 0.0, fat: 1.2, unit: 'g', defaultAmount: 150 },
  { id: 'f3', name: 'Tavuk Budu (Fırın / Pişmiş, Derisiz)', category: 'Et & Kümes Hayvanları', calories: 195, protein: 24.5, carbs: 0.0, fat: 10.5, unit: 'g', defaultAmount: 150 },
  { id: 'f4', name: 'Tavuk Kanat (Fırında, Pişmiş)', category: 'Et & Kümes Hayvanları', calories: 230, protein: 21.0, carbs: 0.0, fat: 16.0, unit: 'g', defaultAmount: 120 },
  { id: 'f5', name: 'Tavuk Ciğeri (Sote)', category: 'Et & Kümes Hayvanları', calories: 167, protein: 24.0, carbs: 0.9, fat: 6.5, unit: 'g', defaultAmount: 150 },
  { id: 'f6', name: 'Hindi Göğsü (Izgara / Pişmiş)', category: 'Et & Kümes Hayvanları', calories: 147, protein: 30.0, carbs: 0.0, fat: 2.0, unit: 'g', defaultAmount: 150 },
  { id: 'f7', name: 'Hindi Füme (Dilimli)', category: 'Et & Kümes Hayvanları', calories: 105, protein: 18.0, carbs: 2.0, fat: 2.5, unit: 'g', defaultAmount: 50 },
  { id: 'f8', name: 'Hindi Kıyma (Az Yağlı, Pişmiş)', category: 'Et & Kümes Hayvanları', calories: 180, protein: 26.0, carbs: 0.0, fat: 8.5, unit: 'g', defaultAmount: 150 },
  { id: 'f9', name: 'Dana Biftek / Bonfile (Yağsız Izgara)', category: 'Et & Kümes Hayvanları', calories: 215, protein: 28.0, carbs: 0.0, fat: 11.0, unit: 'g', defaultAmount: 150 },
  { id: 'f10', name: 'Dana Antrikot (Izgara)', category: 'Et & Kümes Hayvanları', calories: 260, protein: 25.0, carbs: 0.0, fat: 18.0, unit: 'g', defaultAmount: 150 },
  { id: 'f11', name: 'Dana Kıyması (%10 Az Yağlı, Pişmiş)', category: 'Et & Kümes Hayvanları', calories: 217, protein: 26.1, carbs: 0.0, fat: 11.8, unit: 'g', defaultAmount: 150 },
  { id: 'f12', name: 'Dana Kıyması (%20 Orta Yağlı, Pişmiş)', category: 'Et & Kümes Hayvanları', calories: 260, protein: 24.0, carbs: 0.0, fat: 18.0, unit: 'g', defaultAmount: 150 },
  { id: 'f13', name: 'Izgara Köfte (Ev Yapımı Dana)', category: 'Et & Kümes Hayvanları', calories: 245, protein: 22.0, carbs: 4.5, fat: 15.0, unit: 'g', defaultAmount: 150 },
  { id: 'f14', name: 'Dana Kuşbaşı (Haşlama / Sote)', category: 'Et & Kümes Hayvanları', calories: 210, protein: 27.0, carbs: 0.0, fat: 10.5, unit: 'g', defaultAmount: 150 },
  { id: 'f15', name: 'Kuzu Pirzola (Izgara)', category: 'Et & Kümes Hayvanları', calories: 280, protein: 24.0, carbs: 0.0, fat: 20.0, unit: 'g', defaultAmount: 120 },
  { id: 'f16', name: 'Dana Ciğer (Izgara / Tava)', category: 'Et & Kümes Hayvanları', calories: 175, protein: 26.0, carbs: 3.8, fat: 5.5, unit: 'g', defaultAmount: 150 },

  // ----------------------------------------------------------------------------
  // 2. BALIK & DENİZ ÜRÜNLERİ
  // ----------------------------------------------------------------------------
  { id: 'f17', name: 'Somon Balığı (Fırın / Izgara)', category: 'Balık & Deniz Ürünleri', calories: 206, protein: 22.0, carbs: 0.0, fat: 12.3, unit: 'g', defaultAmount: 150 },
  { id: 'f18', name: 'Ton Balığı (Konserve, Suda)', category: 'Balık & Deniz Ürünleri', calories: 116, protein: 25.5, carbs: 0.0, fat: 1.0, unit: 'g', defaultAmount: 100 },
  { id: 'f19', name: 'Ton Balığı (Konserve, Yağda Süzülmüş)', category: 'Balık & Deniz Ürünleri', calories: 198, protein: 29.0, carbs: 0.0, fat: 8.2, unit: 'g', defaultAmount: 100 },
  { id: 'f20', name: 'Çipura (Izgara)', category: 'Balık & Deniz Ürünleri', calories: 135, protein: 20.5, carbs: 0.0, fat: 5.5, unit: 'g', defaultAmount: 200 },
  { id: 'f21', name: 'Levrek (Izgara)', category: 'Balık & Deniz Ürünleri', calories: 124, protein: 23.5, carbs: 0.0, fat: 2.8, unit: 'g', defaultAmount: 200 },
  { id: 'f22', name: 'Hamsi (Fırında Buğulama)', category: 'Balık & Deniz Ürünleri', calories: 160, protein: 20.0, carbs: 0.0, fat: 9.0, unit: 'g', defaultAmount: 150 },
  { id: 'f23', name: 'Uskumru (Izgara)', category: 'Balık & Deniz Ürünleri', calories: 205, protein: 19.0, carbs: 0.0, fat: 14.0, unit: 'g', defaultAmount: 150 },
  { id: 'f24', name: 'Karides (Haşlanmış / Izgara)', category: 'Balık & Deniz Ürünleri', calories: 99, protein: 21.0, carbs: 0.2, fat: 1.1, unit: 'g', defaultAmount: 150 },

  // ----------------------------------------------------------------------------
  // 3. YUMURTA & SÜT ÜRÜNLERİ
  // ----------------------------------------------------------------------------
  { id: 'f25', name: 'Yumurta (Tam, Haşlanmış - 1 Adet ~ 50g)', category: 'Yumurta & Süt Ürünleri', calories: 155, protein: 12.6, carbs: 1.1, fat: 10.6, unit: 'g', defaultAmount: 100 },
  { id: 'f26', name: 'Yumurta Beyazı (Haşlanmış)', category: 'Yumurta & Süt Ürünleri', calories: 52, protein: 11.0, carbs: 0.7, fat: 0.2, unit: 'g', defaultAmount: 100 },
  { id: 'f27', name: 'Sahanda Yumurta (1 Tatlı Kaşığı Zeytinyağlı)', category: 'Yumurta & Süt Ürünleri', calories: 185, protein: 12.0, carbs: 1.0, fat: 14.5, unit: 'g', defaultAmount: 100 },
  { id: 'f28', name: 'Menemen (Yumurtalı & Domatesli)', category: 'Yumurta & Süt Ürünleri', calories: 110, protein: 6.5, carbs: 5.0, fat: 7.2, unit: 'g', defaultAmount: 150 },
  { id: 'f29', name: 'Lor Peyniri (Yağsız / Sporcu Loru)', category: 'Yumurta & Süt Ürünleri', calories: 85, protein: 17.5, carbs: 2.8, fat: 1.0, unit: 'g', defaultAmount: 100 },
  { id: 'f30', name: 'Süzme Peynir (Yarım Yağlı)', category: 'Yumurta & Süt Ürünleri', calories: 190, protein: 13.5, carbs: 3.5, fat: 14.0, unit: 'g', defaultAmount: 50 },
  { id: 'f31', name: 'Beyaz Peynir (Tam Yağlı Klasik)', category: 'Yumurta & Süt Ürünleri', calories: 260, protein: 15.0, carbs: 2.5, fat: 21.0, unit: 'g', defaultAmount: 50 },
  { id: 'f32', name: 'Kaşar Peyniri (Taze)', category: 'Yumurta & Süt Ürünleri', calories: 350, protein: 25.0, carbs: 1.5, fat: 27.0, unit: 'g', defaultAmount: 40 },
  { id: 'f33', name: 'Eski Kaşar Peyniri', category: 'Yumurta & Süt Ürünleri', calories: 380, protein: 28.0, carbs: 1.0, fat: 30.0, unit: 'g', defaultAmount: 30 },
  { id: 'f34', name: 'Tulum Peyniri', category: 'Yumurta & Süt Ürünleri', calories: 335, protein: 22.0, carbs: 2.0, fat: 26.5, unit: 'g', defaultAmount: 40 },
  { id: 'f35', name: 'Çökelek (Yağsız)', category: 'Yumurta & Süt Ürünleri', calories: 95, protein: 19.0, carbs: 3.0, fat: 1.2, unit: 'g', defaultAmount: 100 },
  { id: 'f36', name: 'Labne Peyniri', category: 'Yumurta & Süt Ürünleri', calories: 195, protein: 6.0, carbs: 4.5, fat: 17.5, unit: 'g', defaultAmount: 50 },
  { id: 'f37', name: 'Süzme Yoğurt (%2 Az Yağlı)', category: 'Yumurta & Süt Ürünleri', calories: 75, protein: 9.5, carbs: 4.2, fat: 2.0, unit: 'g', defaultAmount: 150 },
  { id: 'f38', name: 'Tam Yağlı Ev Yoğurdu', category: 'Yumurta & Süt Ürünleri', calories: 65, protein: 3.8, carbs: 5.0, fat: 3.8, unit: 'g', defaultAmount: 200 },
  { id: 'f39', name: 'Kefir (Sade)', category: 'Yumurta & Süt Ürünleri', calories: 55, protein: 3.4, carbs: 4.5, fat: 2.5, unit: 'ml', defaultAmount: 200 },
  { id: 'f40', name: 'Ayran', category: 'Yumurta & Süt Ürünleri', calories: 38, protein: 1.8, carbs: 2.8, fat: 1.5, unit: 'ml', defaultAmount: 250 },
  { id: 'f41', name: 'Yarım Yağlı Süt (%1.5)', category: 'Yumurta & Süt Ürünleri', calories: 47, protein: 3.3, carbs: 4.7, fat: 1.5, unit: 'ml', defaultAmount: 200 },
  { id: 'f42', name: 'Yağsız Süt (%0.1)', category: 'Yumurta & Süt Ürünleri', calories: 35, protein: 3.4, carbs: 4.9, fat: 0.1, unit: 'ml', defaultAmount: 200 },
  { id: 'f43', name: 'Protein Süt (Kakaolu / Vanilyalı - Pınar/İçim)', category: 'Sporcu Takviyeleri & Fit', calories: 62, protein: 6.5, carbs: 5.8, fat: 0.5, unit: 'ml', defaultAmount: 250 },
  { id: 'f44', name: 'Badem Sütü (Şekersiz)', category: 'Yumurta & Süt Ürünleri', calories: 15, protein: 0.6, carbs: 0.3, fat: 1.2, unit: 'ml', defaultAmount: 200 },

  // ----------------------------------------------------------------------------
  // 4. TAHIL, BAKLİYAT & EKMEK GRUBU
  // ----------------------------------------------------------------------------
  { id: 'f45', name: 'Yulaf Ezmesi (Kuru)', category: 'Tahıl & Bakliyat', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, unit: 'g', defaultAmount: 60 },
  { id: 'f46', name: 'Yulaf Kepeği', category: 'Tahıl & Bakliyat', calories: 246, protein: 17.3, carbs: 44.0, fat: 7.0, unit: 'g', defaultAmount: 40 },
  { id: 'f47', name: 'Pirinç Pilavı (Sade, Pişmiş)', category: 'Tahıl & Bakliyat', calories: 130, protein: 2.7, carbs: 28.0, fat: 0.3, unit: 'g', defaultAmount: 150 },
  { id: 'f48', name: 'Basmati Pirinç (Haşlanmış)', category: 'Tahıl & Bakliyat', calories: 121, protein: 3.0, carbs: 25.2, fat: 0.4, unit: 'g', defaultAmount: 150 },
  { id: 'f49', name: 'Esmer / Kepekli Pirinç (Haşlanmış)', category: 'Tahıl & Bakliyat', calories: 112, protein: 2.6, carbs: 23.5, fat: 0.9, unit: 'g', defaultAmount: 150 },
  { id: 'f50', name: 'Bulgur Pilavı (Sade, Pişmiş)', category: 'Tahıl & Bakliyat', calories: 112, protein: 3.1, carbs: 23.0, fat: 0.8, unit: 'g', defaultAmount: 150 },
  { id: 'f51', name: 'Siyez Bulguru (Haşlanmış)', category: 'Tahıl & Bakliyat', calories: 120, protein: 4.2, carbs: 24.0, fat: 1.1, unit: 'g', defaultAmount: 150 },
  { id: 'f52', name: 'Kinoa (Haşlanmış)', category: 'Tahıl & Bakliyat', calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, unit: 'g', defaultAmount: 150 },
  { id: 'f53', name: 'Karabuğday / Greçka (Haşlanmış)', category: 'Tahıl & Bakliyat', calories: 92, protein: 3.4, carbs: 19.9, fat: 0.6, unit: 'g', defaultAmount: 150 },
  { id: 'f54', name: 'Makarna (Klasik Pişmiş)', category: 'Tahıl & Bakliyat', calories: 158, protein: 5.8, carbs: 31.0, fat: 0.9, unit: 'g', defaultAmount: 150 },
  { id: 'f55', name: 'Tam Buğday Makarna (Pişmiş)', category: 'Tahıl & Bakliyat', calories: 145, protein: 6.5, carbs: 28.5, fat: 1.1, unit: 'g', defaultAmount: 150 },
  { id: 'f56', name: 'Pirinç Unu / Cream of Rice (Kuru)', category: 'Tahıl & Bakliyat', calories: 365, protein: 6.0, carbs: 80.0, fat: 1.0, unit: 'g', defaultAmount: 50 },
  { id: 'f57', name: 'Haşlanmış Yeşil Mercimek', category: 'Tahıl & Bakliyat', calories: 116, protein: 9.0, carbs: 20.0, fat: 0.4, unit: 'g', defaultAmount: 150 },
  { id: 'f58', name: 'Haşlanmış Nohut', category: 'Tahıl & Bakliyat', calories: 164, protein: 8.9, carbs: 27.0, fat: 2.6, unit: 'g', defaultAmount: 150 },
  { id: 'f59', name: 'Haşlanmış Kuru Fasulye', category: 'Tahıl & Bakliyat', calories: 127, protein: 8.7, carbs: 22.8, fat: 0.5, unit: 'g', defaultAmount: 150 },
  { id: 'f60', name: 'Haşlanmış Kırmızı Barbunya', category: 'Tahıl & Bakliyat', calories: 128, protein: 9.2, carbs: 22.5, fat: 0.6, unit: 'g', defaultAmount: 150 },
  { id: 'f61', name: 'Tam Buğday Ekmeği (1 Dilim ~ 30g)', category: 'Tahıl & Bakliyat', calories: 247, protein: 9.0, carbs: 48.0, fat: 2.0, unit: 'g', defaultAmount: 30 },
  { id: 'f62', name: 'Çavdar Ekmeği (1 Dilim ~ 30g)', category: 'Tahıl & Bakliyat', calories: 250, protein: 8.5, carbs: 48.5, fat: 1.8, unit: 'g', defaultAmount: 30 },
  { id: 'f63', name: 'Beyaz Ekmek (1 Dilim ~ 30g)', category: 'Tahıl & Bakliyat', calories: 265, protein: 8.5, carbs: 49.0, fat: 3.2, unit: 'g', defaultAmount: 30 },
  { id: 'f64', name: 'Lavaş / Tortilla Ekmeği (1 Adet ~ 60g)', category: 'Tahıl & Bakliyat', calories: 280, protein: 8.0, carbs: 50.0, fat: 5.0, unit: 'g', defaultAmount: 60 },
  { id: 'f65', name: 'Sokak Simiti (1 Adet ~ 100g)', category: 'Tahıl & Bakliyat', calories: 310, protein: 10.0, carbs: 58.0, fat: 4.5, unit: 'g', defaultAmount: 100 },
  { id: 'f66', name: 'Haşlanmış Mısır', category: 'Tahıl & Bakliyat', calories: 96, protein: 3.4, carbs: 21.0, fat: 1.5, unit: 'g', defaultAmount: 100 },

  // ----------------------------------------------------------------------------
  // 5. TÜRK EV YEMEKLERİ & ÇORBALAR
  // ----------------------------------------------------------------------------
  { id: 'f67', name: 'Kırmızı Mercimek Çorbası (1 Kase ~ 250ml)', category: 'Ev Yemekleri & Çorbalar', calories: 135, protein: 6.5, carbs: 20.0, fat: 3.5, unit: 'g', defaultAmount: 250 },
  { id: 'f68', name: 'Ezogelin Çorbası (1 Kase ~ 250ml)', category: 'Ev Yemekleri & Çorbalar', calories: 145, protein: 6.0, carbs: 22.0, fat: 4.0, unit: 'g', defaultAmount: 250 },
  { id: 'f69', name: 'Tarhana Çorbası (1 Kase ~ 250ml)', category: 'Ev Yemekleri & Çorbalar', calories: 120, protein: 4.5, carbs: 18.0, fat: 3.5, unit: 'g', defaultAmount: 250 },
  { id: 'f70', name: 'Tavuk Suyu Şehriye Çorbası (1 Kase)', category: 'Ev Yemekleri & Çorbalar', calories: 110, protein: 7.0, carbs: 14.0, fat: 3.0, unit: 'g', defaultAmount: 250 },
  { id: 'f71', name: 'Kuru Fasulye Yemeği (Etsiz, Pişmiş)', category: 'Ev Yemekleri & Çorbalar', calories: 130, protein: 7.5, carbs: 18.0, fat: 3.5, unit: 'g', defaultAmount: 200 },
  { id: 'f72', name: 'Kıymalı Kuru Fasulye (Pişmiş)', category: 'Ev Yemekleri & Çorbalar', calories: 165, protein: 11.5, carbs: 16.0, fat: 6.5, unit: 'g', defaultAmount: 200 },
  { id: 'f73', name: 'Nohut Yemeği (Etsiz, Pişmiş)', category: 'Ev Yemekleri & Çorbalar', calories: 145, protein: 7.0, carbs: 21.0, fat: 4.0, unit: 'g', defaultAmount: 200 },
  { id: 'f74', name: 'Tavuk Sote (Biberli, Domatesli)', category: 'Ev Yemekleri & Çorbalar', calories: 140, protein: 19.5, carbs: 4.0, fat: 5.5, unit: 'g', defaultAmount: 200 },
  { id: 'f75', name: 'Dana Et Sote (Sebzeli)', category: 'Ev Yemekleri & Çorbalar', calories: 175, protein: 21.0, carbs: 3.5, fat: 8.5, unit: 'g', defaultAmount: 200 },
  { id: 'f76', name: 'İzmir Köfte (Patates & Soslu)', category: 'Ev Yemekleri & Çorbalar', calories: 180, protein: 12.0, carbs: 11.0, fat: 10.0, unit: 'g', defaultAmount: 200 },
  { id: 'f77', name: 'Karnıyarık (Kıymalı Patlıcan)', category: 'Ev Yemekleri & Çorbalar', calories: 145, protein: 6.5, carbs: 6.0, fat: 11.0, unit: 'g', defaultAmount: 200 },
  { id: 'f78', name: 'Taze Fasulye Yemeği (Zeytinyağlı)', category: 'Ev Yemekleri & Çorbalar', calories: 75, protein: 2.2, carbs: 8.0, fat: 4.2, unit: 'g', defaultAmount: 200 },
  { id: 'f79', name: 'Kıymalı Ispanak Yemeği', category: 'Ev Yemekleri & Çorbalar', calories: 105, protein: 7.0, carbs: 4.5, fat: 6.8, unit: 'g', defaultAmount: 200 },
  { id: 'f80', name: 'Biber Dolması (Kıymalı - 1 Adet ~ 120g)', category: 'Ev Yemekleri & Çorbalar', calories: 155, protein: 8.0, carbs: 13.0, fat: 7.5, unit: 'g', defaultAmount: 120 },
  { id: 'f81', name: 'Zeytinyağlı Yaprak Sarması (5 Adet ~ 100g)', category: 'Ev Yemekleri & Çorbalar', calories: 185, protein: 3.0, carbs: 26.0, fat: 8.0, unit: 'g', defaultAmount: 100 },
  { id: 'f82', name: 'Mantı (Yoğurt & Soslu, 1 Porsiyon ~ 200g)', category: 'Ev Yemekleri & Çorbalar', calories: 170, protein: 7.5, carbs: 24.0, fat: 5.5, unit: 'g', defaultAmount: 200 },

  // ----------------------------------------------------------------------------
  // 6. SEBZE, KÖK SEBZELER & YEŞİLLİKLER
  // ----------------------------------------------------------------------------
  { id: 'f83', name: 'Haşlanmış Patates', category: 'Sebze & Yeşillik', calories: 87, protein: 1.9, carbs: 20.1, fat: 0.1, unit: 'g', defaultAmount: 150 },
  { id: 'f84', name: 'Fırın Patates (Baharatlı & Az Yağlı)', category: 'Sebze & Yeşillik', calories: 110, protein: 2.2, carbs: 23.0, fat: 1.5, unit: 'g', defaultAmount: 150 },
  { id: 'f85', name: 'Tatlı Patates (Fırın)', category: 'Sebze & Yeşillik', calories: 90, protein: 2.0, carbs: 21.0, fat: 0.1, unit: 'g', defaultAmount: 150 },
  { id: 'f86', name: 'Brokoli (Buharda / Haşlanmış)', category: 'Sebze & Yeşillik', calories: 35, protein: 2.4, carbs: 7.2, fat: 0.4, unit: 'g', defaultAmount: 150 },
  { id: 'f87', name: 'Karnabahar (Fırın / Haşlanmış)', category: 'Sebze & Yeşillik', calories: 25, protein: 1.9, carbs: 5.0, fat: 0.3, unit: 'g', defaultAmount: 150 },
  { id: 'f88', name: 'Kabak (Izgara / Haşlanmış)', category: 'Sebze & Yeşillik', calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, unit: 'g', defaultAmount: 150 },
  { id: 'f89', name: 'Kuşkonmaz (Izgara)', category: 'Sebze & Yeşillik', calories: 22, protein: 2.4, carbs: 4.0, fat: 0.2, unit: 'g', defaultAmount: 100 },
  { id: 'f90', name: 'Mantar (Kültür / İstiridye Sote)', category: 'Sebze & Yeşillik', calories: 28, protein: 3.1, carbs: 3.3, fat: 0.5, unit: 'g', defaultAmount: 150 },
  { id: 'f91', name: 'Ispanak (Çiğ / Salata)', category: 'Sebze & Yeşillik', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, unit: 'g', defaultAmount: 100 },
  { id: 'f92', name: 'Salatalık', category: 'Sebze & Yeşillik', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, unit: 'g', defaultAmount: 120 },
  { id: 'f93', name: 'Domates', category: 'Sebze & Yeşillik', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, unit: 'g', defaultAmount: 120 },
  { id: 'f94', name: 'Kırmızı Kapya Biber', category: 'Sebze & Yeşillik', calories: 31, protein: 1.0, carbs: 6.0, fat: 0.3, unit: 'g', defaultAmount: 100 },
  { id: 'f95', name: 'Havuç (Çiğ)', category: 'Sebze & Yeşillik', calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, unit: 'g', defaultAmount: 100 },
  { id: 'f96', name: 'Marul / Kıvırcık', category: 'Sebze & Yeşillik', calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, unit: 'g', defaultAmount: 80 },
  { id: 'f97', name: 'Roka & Maydanoz Karışımı', category: 'Sebze & Yeşillik', calories: 25, protein: 2.6, carbs: 3.7, fat: 0.7, unit: 'g', defaultAmount: 60 },

  // ----------------------------------------------------------------------------
  // 7. MEYVELER & KURU MEYVELER
  // ----------------------------------------------------------------------------
  { id: 'f98', name: 'Muz (Orta Boy ~ 110g)', category: 'Meyve', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, unit: 'g', defaultAmount: 110 },
  { id: 'f99', name: 'Elma (Orta Boy ~ 150g)', category: 'Meyve', calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, unit: 'g', defaultAmount: 150 },
  { id: 'f100', name: 'Portakal (Orta Boy ~ 130g)', category: 'Meyve', calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1, unit: 'g', defaultAmount: 130 },
  { id: 'f101', name: 'Mandalina (1 Adet ~ 70g)', category: 'Meyve', calories: 53, protein: 0.8, carbs: 13.3, fat: 0.3, unit: 'g', defaultAmount: 100 },
  { id: 'f102', name: 'Çilek', category: 'Meyve', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, unit: 'g', defaultAmount: 150 },
  { id: 'f103', name: 'Yaban Mersini (Blueberry)', category: 'Meyve', calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3, unit: 'g', defaultAmount: 100 },
  { id: 'f104', name: 'Karpuz (1 Dilim ~ 200g)', category: 'Meyve', calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, unit: 'g', defaultAmount: 200 },
  { id: 'f105', name: 'Kavun', category: 'Meyve', calories: 34, protein: 0.8, carbs: 8.2, fat: 0.2, unit: 'g', defaultAmount: 200 },
  { id: 'f106', name: 'Kivi (1 Adet ~ 70g)', category: 'Meyve', calories: 61, protein: 1.1, carbs: 14.7, fat: 0.5, unit: 'g', defaultAmount: 100 },
  { id: 'f107', name: 'Ananas', category: 'Meyve', calories: 50, protein: 0.5, carbs: 13.1, fat: 0.1, unit: 'g', defaultAmount: 150 },
  { id: 'f108', name: 'Şeftali / Nektarin', category: 'Meyve', calories: 39, protein: 0.9, carbs: 9.5, fat: 0.3, unit: 'g', defaultAmount: 130 },
  { id: 'f109', name: 'Medine Hurması (1 Adet ~ 15g)', category: 'Meyve', calories: 277, protein: 1.8, carbs: 75.0, fat: 0.2, unit: 'g', defaultAmount: 30 },
  { id: 'f110', name: 'Kuru Kayısı (Gün Kurusu)', category: 'Meyve', calories: 241, protein: 3.4, carbs: 62.6, fat: 0.5, unit: 'g', defaultAmount: 30 },
  { id: 'f111', name: 'Kuru İncir', category: 'Meyve', calories: 249, protein: 3.3, carbs: 63.9, fat: 0.9, unit: 'g', defaultAmount: 30 },
  { id: 'f112', name: 'Kuru Üzüm', category: 'Meyve', calories: 299, protein: 3.1, carbs: 79.2, fat: 0.5, unit: 'g', defaultAmount: 30 },

  // ----------------------------------------------------------------------------
  // 8. KURUYEMİŞLER, TOHUMLAR & SAĞLIKLI YAĞLAR
  // ----------------------------------------------------------------------------
  { id: 'f113', name: 'Zeytinyağı (1 Yemek Kaşığı ~ 10g)', category: 'Kuruyemiş & Tohum', calories: 884, protein: 0.0, carbs: 0.0, fat: 100.0, unit: 'g', defaultAmount: 10 },
  { id: 'f114', name: 'Tereyağı (1 Tatlı Kaşığı ~ 10g)', category: 'Kuruyemiş & Tohum', calories: 717, protein: 0.9, carbs: 0.1, fat: 81.0, unit: 'g', defaultAmount: 10 },
  { id: 'f115', name: 'Hindistan Cevizi Yağı', category: 'Kuruyemiş & Tohum', calories: 862, protein: 0.0, carbs: 0.0, fat: 100.0, unit: 'g', defaultAmount: 10 },
  { id: 'f116', name: 'Çiğ Badem (1 Avuç ~ 30g)', category: 'Kuruyemiş & Tohum', calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9, unit: 'g', defaultAmount: 30 },
  { id: 'f117', name: 'Çiğ Ceviz İçi (1 Avuç ~ 30g)', category: 'Kuruyemiş & Tohum', calories: 654, protein: 15.2, carbs: 13.7, fat: 65.2, unit: 'g', defaultAmount: 30 },
  { id: 'f118', name: 'Çiğ Fındık (1 Avuç ~ 30g)', category: 'Kuruyemiş & Tohum', calories: 628, protein: 15.0, carbs: 16.7, fat: 60.8, unit: 'g', defaultAmount: 30 },
  { id: 'f119', name: 'Çiğ Kaju (1 Avuç ~ 30g)', category: 'Kuruyemiş & Tohum', calories: 553, protein: 18.2, carbs: 30.2, fat: 43.8, unit: 'g', defaultAmount: 30 },
  { id: 'f120', name: 'Antep Fıstığı (Kavrulmuş/Tuzsuz)', category: 'Kuruyemiş & Tohum', calories: 562, protein: 20.3, carbs: 27.5, fat: 45.3, unit: 'g', defaultAmount: 30 },
  { id: 'f121', name: 'Kabak Çekirdeği (Çiğ İçi)', category: 'Kuruyemiş & Tohum', calories: 559, protein: 30.2, carbs: 10.7, fat: 49.1, unit: 'g', defaultAmount: 30 },
  { id: 'f122', name: 'Fıstık Ezmesi (%100 Şekersiz Doğal)', category: 'Kuruyemiş & Tohum', calories: 588, protein: 25.0, carbs: 20.0, fat: 50.0, unit: 'g', defaultAmount: 25 },
  { id: 'f123', name: 'Fındık Ezmesi (Şekersiz Katkısız)', category: 'Kuruyemiş & Tohum', calories: 630, protein: 14.5, carbs: 16.0, fat: 61.0, unit: 'g', defaultAmount: 25 },
  { id: 'f124', name: 'Tahin', category: 'Kuruyemiş & Tohum', calories: 595, protein: 17.0, carbs: 21.2, fat: 53.8, unit: 'g', defaultAmount: 20 },
  { id: 'f125', name: 'Chia Tohumu', category: 'Kuruyemiş & Tohum', calories: 486, protein: 16.5, carbs: 42.1, fat: 30.7, unit: 'g', defaultAmount: 15 },
  { id: 'f126', name: 'Keten Tohumu (Öğütülmüş)', category: 'Kuruyemiş & Tohum', calories: 534, protein: 18.3, carbs: 28.9, fat: 42.2, unit: 'g', defaultAmount: 15 },
  { id: 'f127', name: 'Avokado (Yarım Avokado ~ 75g)', category: 'Kuruyemiş & Tohum', calories: 160, protein: 2.0, carbs: 8.5, fat: 14.7, unit: 'g', defaultAmount: 75 },
  { id: 'f128', name: 'Siyah Zeytin (5 Adet ~ 20g)', category: 'Kuruyemiş & Tohum', calories: 115, protein: 0.8, carbs: 6.3, fat: 10.7, unit: 'g', defaultAmount: 20 },

  // ----------------------------------------------------------------------------
  // 9. SPORCU TAKVİYELERİ & FİT ATIŞTIRMALIKLAR
  // ----------------------------------------------------------------------------
  { id: 'f129', name: 'Whey Protein Tozu (1 Ölçek ~ 30g)', category: 'Sporcu Takviyeleri & Fit', calories: 380, protein: 80.0, carbs: 5.0, fat: 4.0, unit: 'g', defaultAmount: 30 },
  { id: 'f130', name: 'İzole Whey Protein (1 Ölçek ~ 30g)', category: 'Sporcu Takviyeleri & Fit', calories: 370, protein: 88.0, carbs: 1.5, fat: 1.0, unit: 'g', defaultAmount: 30 },
  { id: 'f131', name: 'Kazein Protein (Gece Proteini, 30g)', category: 'Sporcu Takviyeleri & Fit', calories: 360, protein: 76.0, carbs: 4.0, fat: 2.0, unit: 'g', defaultAmount: 30 },
  { id: 'f132', name: 'Yüksek Proteinli Bar (1 Adet ~ 50g)', category: 'Sporcu Takviyeleri & Fit', calories: 370, protein: 40.0, carbs: 32.0, fat: 10.0, unit: 'g', defaultAmount: 50 },
  { id: 'f133', name: 'Pirinç Patlağı / Rice Cake (1 Adet ~ 10g)', category: 'Sporcu Takviyeleri & Fit', calories: 385, protein: 8.0, carbs: 82.0, fat: 2.5, unit: 'g', defaultAmount: 20 },
  { id: 'f134', name: 'Yüksek Proteinli Puding (1 Kutu 200g)', category: 'Sporcu Takviyeleri & Fit', calories: 76, protein: 10.0, carbs: 5.5, fat: 1.5, unit: 'g', defaultAmount: 200 },

  // ----------------------------------------------------------------------------
  // 10. RESTORAN & SOKAK LEZZETLERİ (FAST FOOD & CHEAT MEAL)
  // ----------------------------------------------------------------------------
  { id: 'f135', name: 'Lahmacun (1 Adet Standart ~ 120g)', category: 'Atıştırmalık & Fast Food', calories: 200, protein: 8.5, carbs: 27.0, fat: 6.5, unit: 'g', defaultAmount: 120 },
  { id: 'f136', name: 'Kıymalı Pide (1 Porsiyon ~ 200g)', category: 'Atıştırmalık & Fast Food', calories: 260, protein: 11.5, carbs: 35.0, fat: 8.5, unit: 'g', defaultAmount: 200 },
  { id: 'f137', name: 'Tavuk Döner Dürüm (Lavaşlı ~ 150g)', category: 'Atıştırmalık & Fast Food', calories: 215, protein: 14.0, carbs: 24.0, fat: 7.0, unit: 'g', defaultAmount: 150 },
  { id: 'f138', name: 'Et Döner Dürüm (Lavaşlı ~ 150g)', category: 'Atıştırmalık & Fast Food', calories: 250, protein: 15.5, carbs: 23.0, fat: 11.0, unit: 'g', defaultAmount: 150 },
  { id: 'f139', name: 'Etsiz Çiğ Köfte Dürüm (1 Dürüm ~ 150g)', category: 'Atıştırmalık & Fast Food', calories: 210, protein: 5.5, carbs: 36.0, fat: 5.0, unit: 'g', defaultAmount: 150 },
  { id: 'f140', name: 'Hamburger (Ev Yapımı Dana Köfteli ~ 200g)', category: 'Atıştırmalık & Fast Food', calories: 240, protein: 13.0, carbs: 22.0, fat: 11.0, unit: 'g', defaultAmount: 200 },
  { id: 'f141', name: 'Karışık Pizza (1 Orta Dilim ~ 100g)', category: 'Atıştırmalık & Fast Food', calories: 265, protein: 11.0, carbs: 30.0, fat: 11.5, unit: 'g', defaultAmount: 100 }
];
