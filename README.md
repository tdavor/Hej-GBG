# Hej Göteborg

Interaktivni vodič za život u Göteborgu (HR / EN / SV): kontrolna lista za prvih 90 dana, rječnik švedskih pojmova, imenik ustanova i preporuka te nativni Kotlin kod.

## Kako dobiti `.apk` na GitHubu

1. U AI Studiju kliknite **Save to GitHub** kako biste spremili izmjene u svoj GitHub repozitorij (ako AI Studio napravi Pull Request, otvorite ga na GitHubu i kliknite **Merge pull request**).
2. Otvorite **Actions** na svom GitHub repozitoriju — workflow **Build Android APK** automatski gradi `hej-goteborg-debug-apk` (`app-debug.apk`) pod **Artifacts**.
3. Ako želite izravan `.apk` link bez raspakiravanja ZIP-a, na GitHubu otvorite **Releases → Draft a new release**, upišite tag **`v1.0.0`** i objavite release — GitHub Actions će automatski priložiti **`Hej-Goteborg-v1.0.0.apk`** izravno u taj Release.
