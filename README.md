# Angular Mini Kullanıcı Yönetim Uygulaması
Angular, ExpessJS ve PostgreSQL kullanılarak geliştirilmiş mini kullanıcı yönetim uygulamasıdır. Yöneticilerin kullanıcı ekleme,düzenleme ve silme işlemleri yapabildiği; kullanıcıların ise sadece diğer kullanıcıları görüntüleyebildiği bir web uygulamasıdır.

## Kullanılar Teknolojiler
- HTML
- CSS - Bootstrap
- Angular - Typescript
- NodeJS - ExpressJS
- JSON Web Token
- Bcrypt

## Kurulum
`user.sql` dosyasını pgAdminde 'userManagementDB' ismindeki database'e query tool yardımı ile yazılabilir. Database adı, kullanıcı adı ve şifresi gibi bilgileri `/backend/db.js` dosyasından değiştirebilirsiniz.

Akabinde sırasıyla `backend` ve `ng-frontend` klasörleri içinde `npm install` komutu çalıştırılmalı.

Gerekli npm modülleri indirildikten sonra 2 klasörde de `npm start` komutu ile projeyi çalışır duruma getirebilirsiniz.

Frontend http://localhost:4200 Backend http://localhost:3000 adreslerinde çalışır.
Frontend'de bir port çakışması durumunda CLI otomatik olarak başka bir port'a geçmek için soru soracaktır. Backend'de `backend/app.js` dosyasında `PORT` değişkenini değiştirebilirsiniz.

## Tanımlı kullanıcı adları ve şifreleri
Yönetici hesabı
- Kullanıcı Adı: admin
- Şifre: test

Kullanıcı hesabı:
- Kullanıcı Adı: acanh
- Şifre: test

Kullanıcı hesabı:
- Kullanıcı Adı: deniz7erdem
- Şifre: test

## Kullanım ve görseller
### Giriş ekranı
![image](https://user-images.githubusercontent.com/47831143/211788839-9d9c57d0-01c0-4906-9e4e-c3dfd5877681.png)
- Yanlış bilgi girildiğinde
![image](https://user-images.githubusercontent.com/47831143/211790233-7cdc2a6d-01b5-4aa7-9a9d-dbc459981114.png)

### Kullanıcı hesabı için Anasayfa
![image](https://user-images.githubusercontent.com/47831143/211790404-31d2a85d-d3aa-4594-b3f0-649086e70e1e.png)

### Yönetici hesabı için Anasayfa
![image](https://user-images.githubusercontent.com/47831143/211789263-62327822-d99e-4501-9df3-ec2bacf368db.png)
- Kullanıcı eklendiğinde, kullanıcı listeside yenilenerek hemen güncel durum gösterilir
![image](https://user-images.githubusercontent.com/47831143/211790891-80dc6959-aeb2-4d00-8472-6cda379fd0e9.png)
- Çakışma durumunda uyarı gelir
![image](https://user-images.githubusercontent.com/47831143/211791031-bfa2a8e3-5710-43f0-85ca-44ed5b9958fc.png)

### Kullanıcı ayrıntısı görüntüleme
![image](https://user-images.githubusercontent.com/47831143/211789460-9eec0f90-2d83-4d9e-96ed-715359012470.png)

### Kullanıcı düzenleme
![image](https://user-images.githubusercontent.com/47831143/211789579-0071209a-9360-40e2-a785-a8b5cc3262b7.png)

- Kulanıcı düzenlendiğinde gelen alert

![image](https://user-images.githubusercontent.com/47831143/211791265-944806d3-e8b0-498a-8edd-1f565b6fabce.png)

- Kullanıcı adı çakıiması durumunda gelen alert
![image](https://user-images.githubusercontent.com/47831143/211792934-f161671a-34c7-49ba-9d01-940dfe9e3032.png)


