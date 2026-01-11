# 🏛️ Stari Grad Event Hall - Prezentacioni Website

Profesionalan, moderan i impresivan sajt za prezentaciju ugostiteljskog objekta "Stari Grad" - prostor za venčanja i svečanosti.

## 🎯 STRUKTURA SAJTA

**2 STRANICE:**

1. **`index.html`** - LANDING PAGE (prva strana)
   - Prikazuje 3 kartice: Velika, Srednja, Mala sala
   - Korisnik bira salu → ide na glavni sajt
   - Za sada sve 3 vode na isti sajt

2. **`main.html`** - GLAVNI SAJT
   - Kompletan sajt sa svim sekcijama
   - Header ima dropdown za promenu sale
   - Automatski detektuje koja sala je izabrana

## ✨ Karakteristike

### 🎨 Dizajn
- **Premium dizajn** inspirisan [Perla Event Hall](https://www.perlahall.com/)
- Elegantna zlatno-braon paleta boja
- Moderne animacije i prelazi
- Hero sekcija sa automatskim sliderom slika
- Potpuno responzivan (radi na svim uređajima)

### 📱 Sekcije sajta
1. **Hero Section** - Impresivna prva strana sa sliderom
2. **Specijalna Ponuda** - Banner za promocije
3. **Statistika** - Animirani brojači uspešnosti
4. **O Nama** - Detaljne informacije o prostoru
5. **Usluge** - Venčanja, proslave, korporativni događaji
6. **Prednosti** - Razlozi zašto izabrati Stari Grad
7. **Galerija** - Vaše slike sa modal prikazom
8. **360° Virtuelna Tura** - Interaktivni panoramski prikaz
9. **Recenzije** - Testimonijali klijenata
10. **🗓️ KALENDAR REZERVACIJA** - Interaktivni kalendar sa slobodnim terminima
11. **Kontakt Forma** - Funkcionalna forma za upite

### 🚀 Funkcionalnosti
- ⚡ **Preloader** - Elegantno učitavanje stranice
- 🎬 **Hero Slider** - Automatski menjanje slika
- 📊 **Animirani brojači** - Statistike koje se animiraju pri skrolovanju
- 🖼️ **Lightbox galerija** - Klik za uvećanje slika
- 🌐 **360° Virtual Tour** - Pannellum integracija
- 🗓️ **INTERAKTIVNI KALENDAR** - Sistem rezervacija sa prikazom slobodnih/zauzetih termina
  - Klikabilni dani
  - Izbor vremena (12:00, 18:00, 20:00)
  - Automatsko popunjavanje forme
  - Brojač slobodnih termina
  - Legendа sa bojama (zeleno = slobodno, crveno = zauzeto)
- 📝 **Kontakt forma** - Ready za backend integraciju
- ⬆️ **Scroll to Top** - Brz povratak na vrh
- 🎯 **Sticky navigacija** - Navigacija uvek vidljiva
- 🎭 **Smooth animacije** - Fade-in efekti pri skrolovanju

## 🛠️ Tehnologije

- **HTML5** - Semantička struktura
- **CSS3** - Moderne animacije, Grid, Flexbox
- **JavaScript (Vanilla)** - Bez framework-a
- **Pannellum** - 360° virtuelna tura
- **Google Fonts** - Playfair Display & Montserrat
- **Font Awesome** - Ikone

## 🗓️ Kako radi Kalendar Rezervacija

### Funkcionalnost:
1. **Prikaz kalendara** - Automatski generiše kalendar za trenutni mesec
2. **Navigacija** - Strelice levo/desno za menjanje meseci
3. **Boje:**
   - 🟢 **Zeleno** - Slobodan termin (klik za rezervaciju)
   - 🔴 **Crveno** - Zauzet termin (ne može se kliknuti)
   - 🟡 **Zlatno** - Izabran datum
   - ⚪ **Sivo** - Prošli datumi (ne mogu se izabrati)
4. **Izbor vremena** - Nakon izbora datuma, izaberite vreme (12:00, 18:00, 20:00)
5. **Automatsko popunjavanje** - Datum i vreme se automatski upisuju u kontakt formu

### Prilagođavanje zauzetih datuma:
U `script.js` fajlu (linija ~263):
```javascript
const bookedDates = [
    '2026-01-15',  // Format: YYYY-MM-DD
    '2026-01-22',
    '2026-01-29',
    // Dodajte svoje zauzete datume
];
```

### Prilagođavanje vremena:
U `index.html` fajlu, sekcija "availableSlots":
```html
<button class="time-slot" data-time="12:00">12:00</button>
<button class="time-slot" data-time="18:00">18:00</button>
<button class="time-slot" data-time="20:00">20:00</button>
<!-- Dodajte ili promenite vremena -->
```

## 📋 Kako koristiti

### 1. Otvorite sajt lokalno
Dvaput kliknite na `index.html` fajl ili otvorite u pretraživaču.

### 2. Prilagodite sadržaj

#### Kontakt informacije
U `index.html` fajlu, sekcija **Contact** (linija ~420):
```html
<p>+381 64 123 4567</p>  <!-- Vaš broj telefona -->
<p>info@starigrad.rs</p>   <!-- Vaš email -->
<p>Ulica Stari Grad 123</p> <!-- Vaša adresa -->
```

#### Tekstovi i opisi
- **O nama sekcija** - Promenite opise prema vašem prostoru
- **Statistike** - Ažurirajte brojeve (data-target atribut)
- **Recenzije** - Dodajte prave recenzije vaših klijenata

#### Slike
Zamenite slike u `slike/` folderu sa vašim slikama:
- `stari grad.webp` - Glavna slika objekta
- `unnamed.webp` - Unutrašnjost
- `unnamed (1).webp` - Prostor za proslave

**Preporuka:** Koristite WebP format za bolje performanse.

### 3. Boje i stil

U `style.css` fajlu, na vrhu (linija 2):
```css
:root {
    --primary-color: #c9a961;  /* Zlatna boja */
    --secondary-color: #2c2416; /* Tamno braon */
    --accent-color: #d4af6a;   /* Svetlija zlatna */
}
```

## 🌐 360° Virtuelna Tura

Trenutno koristi vaše postojeće slike. Za pravu 360° turu:

1. **Snimite 360° fotografije:**
   - Koristite 360° kameru (Ricoh Theta, Insta360)
   - Ili mobilne aplikacije (Google Street View app)

2. **Zamenite slike** u `script.js` (linija ~230):
```javascript
const scenes = [
    {
        title: 'Glavni ulaz',
        image: 'slike/360-ulaz.jpg'  // Nova 360° slika
    },
    // Dodajte više scena...
];
```

## 📤 Objavljivanje na internetu

### Opcija 1: Hosting + Domen
1. **Registrujte domen** (npr. `starigrad.rs`, `starigradns.com`)
   - Hosting providers: [Hostinger](https://hostinger.rs), [SiteGround](https://siteground.com)
   
2. **Upload fajlove:**
   - Preko FTP/SFTP
   - Ili File Manager u cPanel

3. **Backend za formu (opciono):**
   - PHP mail() funkcija
   - Ili EmailJS za slanje emailova

### Opcija 2: Besplatno hostovanje
- **GitHub Pages** - Besplatno, brzo
- **Netlify** - Drag & drop, automatsko deploy
- **Vercel** - Odličan za statičke sajtove

## 🎯 Prilagođavanja

### Dodavanje nove sekcije
```html
<section id="nova-sekcija" class="nova-sekcija">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Podnaslov</span>
            <h2 class="section-title">Glavni Naslov</h2>
        </div>
        <!-- Vaš sadržaj -->
    </div>
</section>
```

### Dodavanje u navigaciju
```html
<li><a href="#nova-sekcija">Nova Sekcija</a></li>
```

## 📱 Testiranje

Testirajte sajt na:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android tablet)
- ✅ Mobilni (iPhone, Android)

## 🔧 Backend integracija (Opciono)

Za kontakt formu, dodajte PHP backend:

```php
<?php
// contact.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    
    $to = "info@starigrad.rs";
    $subject = "Nova poruka sa sajta";
    $body = "Ime: $name\nEmail: $email\nTelefon: $phone\nPoruka: $message";
    
    mail($to, $subject, $body);
    
    echo json_encode(['success' => true]);
}
?>
```

Ažurirajte `script.js`:
```javascript
fetch('contact.php', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        alert('Poruka uspešno poslata!');
    }
});
```

## 📊 SEO Optimizacija

1. **Meta tagovi** - Već dodati u `<head>` sekciji
2. **Alt text za slike** - Dodajte deskriptivne alt tekstove
3. **Google Analytics** - Dodajte tracking kod
4. **Sitemap.xml** - Kreirajte za bolje indexiranje

## 🆘 Podrška

Za pitanja i pomoć:
- Email: info@starigrad.rs
- Telefon: +381 64 123 4567

## 📄 Licenca

Ovaj sajt je kreiran za **Stari Grad Event Hall**. Sva prava zadržana © 2026.

---

**Napravljeno sa ❤️ za nezaboravne trenutke**
