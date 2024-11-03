![Logo](SYNOPSIS/assets/images/SYNOPSISDarkBrownLogo.png)
# SYNOPSIS
SYNOPSIS, Gemini AI kullanılarak geliştirilmiş bir mobil uygulamadır. 

## Problem
Öğrenciler, katılamadıkları ya da tekrar gözden geçirmek istedikleri derslerin ses kayıtlarını dinlemektedirler. Fakat bu kayıtlar uzun sürelerde olabiliyor ve bütün kaydı baştan dinlemeleri, ders işlenmeyen ya da dersle ilgili olmayan kısımların da kayıtta bulunuyor olması gibi unsurlar ciddi vakit kayıplarına neden olmaktadır. 

## Amaç
Mobil uygulamaya yüklenilen ders ses kayıtlarının Gemini AI tarafından analiz edilip özetlerinin çıkarılması ile:
- Öğrencilerin vakit kaybının önüne geçilmesi,
- Dersi ya da ses kaydını dinlerken dikkatlerinden kaçabilecek yada unutabilecekleri kısımların önlenmesi hedeflenmiştir.

## Uygulama Özellikleri
- Gemini AI katkısı ile uygulama, yüklenilen dosyanın ilk olarak analiz edilebilir bir ses dosyası ya da bir eğitim içeriği olup olmadığını kontrol eder. Eğer bu kriterler sağlanmazsa kullanıcıya ses dosyası ve işlemin başarısız olduğu hakkında bir bilgi döner. Analiz işlemi gerçekleşmez.
- Yüklenilen ses dosyası istenilen kriterleri sağlar ise Gemini AI ses dosyasını analiz eder. Ana konu, belirtilen önemli konseptler, tarihler vb. kriterlere dikkat edilerek Gemini AI tarafından analiz işlemi gerçekleştirilir.
- Özetlerin rahat erişilebilmesi için kullanıcı tarafından istenilen şekilde oluşturulabilecek bir klasör yapısı tanımlanmıştır. Örnek olarak kullanıcı, Math101 dersinin özetlerini bu dersine özel klasör oluşturarak, oluşturulan klasör altında tutabilmektedir.
- AI modeli kendini geliştirebilen bir teknoloji olduğu için kullanıcının yüklediği ses dosyası için birden fazla analiz yaptırabilmesine olanak sağlanmıştır. Bu analizlere ResultList ekranından erişilebilmekte olup listeden istediği sonucu görüntüleyebilmektedir.
- Yüklenilen ses dosyası hangi dilde olursa olsun çıkarılan özet istenilen dilde olmaktadır. Yani yüklenilen ses dosyasının içerdiği dil fark etmeksizin sonuç için istenilen dilde özetler elde edilebilmektedir.
  
**Kullanılan Teknolojiler:** Gemini AI, React-Native Expo, Firebase 

## Developers
- Beyza Nur Gören
- Yağmur Akbaba

