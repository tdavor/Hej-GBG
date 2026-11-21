# Hej Göteborg

Interaktivni vodič za život u Göteborgu (HR / EN / SV): kontrolna lista za prvih 90 dana, rječnik švedskih pojmova, imenik ustanova i preporuka te nativni Kotlin kod.

## Automatska izrada `.apk` datoteke na GitHubu

Ovaj repozitorij sadrži konfigurirani GitHub Actions workflow (`.github/workflows/build-apk.yml`) koji automatski pakira aplikaciju i kompajlira Android `.apk`.

1. Povežite projekt s GitHubom ili prenesite datoteke u novi GitHub repozitorij (`main` grana).
2. Na GitHubu otvorite karticu **Actions** (ako je potrebno, kliknite *I understand my workflows, go ahead and enable them*).
3. Pokrenut će se workflow **Build Android APK** (ili ga pokrenite ručno putem **Run workflow**).
4. Kad build završi (za ~2–3 minute), na dnu stranice tog builda pod **Artifacts** preuzmite **`hej-goteborg-debug-apk`** (`app-debug.apk`) i instalirajte ga na Android uređaj.
