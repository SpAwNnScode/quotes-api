# Quotes API & Frontend

Dieses Repository enthält eine Zitate-API, die mit Node.js und Express erstellt wurde, sowie ein React-Frontend zur Anzeige und Verwaltung der Zitate.

## Überblick

Die API ermöglicht CRUD-Operationen (Erstellen, Lesen, Aktualisieren, Löschen) für Zitate. Die Zitate werden in einem In-Memory-Datenspeicher verwaltet und können nach Kategorien wie "Inspiration", "Motivation" und "Positivity" gefiltert werden. Das Frontend stellt eine benutzerfreundliche Oberfläche bereit, um die Zitate anzuzeigen, zu filtern, hinzuzufügen, zu bearbeiten und zu löschen.

## Features

- **Zitate abrufen:** Alle Zitate oder gefiltert nach Kategorie abrufen.
- **Zufallszitat:** Ein zufälliges Zitat anzeigen.
- **CRUD-Operationen:** Zitate hinzufügen, vollständig ersetzen (PUT), teilweise aktualisieren (PATCH) und löschen.
- **Sicheres Löschen aller Zitate:** Nur möglich mit einem gültigen Master-Key.
- **Modernes Frontend:** React-basierte Oberfläche für eine intuitive Bedienung.

## Installation

### 1. Repository klonen

```bash
  git clone https://github.com/SpAwNnScode/quotes-api.git
  cd <projektordner>
```

### 2. Backend einrichten

Navigiere in das Projektverzeichnis und installiere die Abhängigkeiten:

```bash
  npm install
```

Erstelle eine `.env`-Datei im Root-Verzeichnis mit folgendem Inhalt:

```ini
  PORT=5000
  MASTER_KEY=dein-master-key
```

### 3. Frontend einrichten

Navigiere, falls erforderlich, in den Frontend-Ordner (sofern separat) und installiere die benötigten Pakete:

```bash
  npm install
```

### Anwendung starten

#### Backend-Server starten

```bash
  npm start
```

Der Server läuft unter [http://localhost:5000](http://localhost:5000).

#### Frontend starten

```bash
  npm start
```

Das Frontend öffnet sich in deinem Standardbrowser und kommuniziert mit dem Backend.

## API-Dokumentation

### `GET /api/quotes`

**Beschreibung:** Ruft alle Zitate ab. Optional können Zitate nach Kategorie gefiltert werden.

- **Query-Parameter:**
  - `category` (optional): Filtert die Zitate nach der angegebenen Kategorie (z. B. Inspiration, Motivation, Positivity).

### `GET /api/quotes/random`

**Beschreibung:** Gibt ein zufälliges Zitat zurück.

### `GET /api/quotes/:id`

**Beschreibung:** Ruft ein spezifisches Zitat anhand seiner ID ab.

### `POST /api/quotes`

**Beschreibung:** Fügt ein neues Zitat hinzu.

- **Request Body:**

```json
{
  "text": "Zitat-Text",
  "category": "Kategorie"
}
```

### `PUT /api/quotes/:id`

**Beschreibung:** Ersetzt ein bestehendes Zitat komplett.

- **Request Body:**

```json
{
  "text": "Neuer Zitat-Text",
  "category": "Neue Kategorie"
}
```

### `PATCH /api/quotes/:id`

**Beschreibung:** Aktualisiert einzelne Felder eines bestehenden Zitats.

- **Request Body:** (Eines oder beide Felder angeben)

```json
{
  "text": "Aktualisierter Zitat-Text",
  "category": "Aktualisierte Kategorie"
}
```

### `DELETE /api/quotes/:id`

**Beschreibung:** Löscht ein spezifisches Zitat anhand der ID.

### `DELETE /api/quotes/all`

**Beschreibung:** Löscht alle Zitate.

- **Query-Parameter:**
  - `key`: Der Master-Key (muss mit dem in der `.env`-Datei definierten Schlüssel übereinstimmen).

## Frontend Funktionen

- **Anzeige und Filter:** Alle Zitate werden angezeigt, und es besteht die Möglichkeit, nach Kategorien (Inspiration, Motivation, Positivity) zu filtern.
- **Zufallszitat:** Ein separater Bereich zeigt ein zufälliges Zitat an.
- **Zitate verwalten:** Zitate können über das Frontend hinzugefügt, bearbeitet oder gelöscht werden.

