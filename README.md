# OpenAITask - Aplikacja do generowania HTML z artykułu

## Opis

Aplikacja `OpenAITask` umożliwia przesyłanie artykułów tekstowych do API OpenAI (modelu GPT) w celu przekształcenia ich na kod HTML. Zawiera następujące funkcje:

1. **Wczytywanie artykułu z pliku tekstowego**: Aplikacja odczytuje artykuł z pliku `.txt`.
2. **Generowanie HTML**: Z pomocą modelu OpenAI (np. GPT-4) artykuł jest przekształcany w kod HTML.
3. **Zapis do pliku**: Wygenerowany kod HTML jest zapisywany do pliku `.html`.

Dodatkowo, aplikacja dodaje znaczniki `<img>` w miejscach, w których można dodać grafikę i ustawia odpowiednie podpisy.

## Wymagania

- Node.js (w wersji 14 lub wyższej)
- Klucz API OpenAI (wymaga rejestracji na platformie OpenAI)

## Instrukcja uruchomienia

### 1. Sklonuj repozytorium

Zacznij od sklonowania repozytorium na swój komputer:

```bash
git clone https://github.com/Kajakaletakifajny/OpenAITask.git
cd OpenAITask

### 2. Zainstaluj zależności

Zainstaluj zależności aplikacji, używając polecenia npm:

npm install

### 3. Konfiguracja API OpenAI

Stwórz plik .env w katalogu głównym projektu i dodaj swój klucz API OpenAI:

OPENAI_API_KEY=twój_klucz_api

### 4. Uruchom aplikację

Po skonfigurowaniu klucza API uruchom aplikację:

npm start

Aplikacja wczyta artykuł z pliku artykul.txt, przekształci go na HTML, a wynik zapisze w pliku artykul.html.

### 5. Pliki wejściowe i wyjściowe

Wejściowy plik: artykul.txt - tekst artykułu, który chcesz przekształcić na HTML.
Wyjściowy plik: artykul.html - plik HTML, który zostanie wygenerowany przez aplikację.


### Jak to działa?

Aplikacja wczytuje artykuł z pliku artykul.txt.
Następnie wysyła treść artykułu do API OpenAI, gdzie jest przekształcana w kod HTML z odpowiednimi tagami.
Wygenerowany HTML jest zapisywany w pliku artykul.html, który możesz otworzyć w przeglądarce.