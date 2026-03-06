Hyte projektin backend


SQL Database diagrammi

```mermaid
erDiagram
    Users ||--o{ DiaryEntries : has
    Users ||--o{ Medications : takes
    Users ||--o{ Exercises : performs
    Users ||--o{ DailySteps : walks

    Users {
        INT user_id PK
        VARCHAR username
        VARCHAR password
        VARCHAR email
        DATETIME created_at
        VARCHAR user_level
    }

    DiaryEntries {
        INT entry_id PK
        INT user_id FK
        DATE entry_date
        VARCHAR mood
        DECIMAL weight
        INT sleep_hours
        INT calories_in
        INT calories_out
        TEXT notes
        DATETIME created_at
    }

    Medications {
        INT medication_id PK
        INT user_id FK
        VARCHAR name
        VARCHAR dosage
        VARCHAR frequency
        DATE start_date
        DATE end_date
    }

    Exercises {
        INT exercise_id PK
        INT user_id FK
        VARCHAR type
        INT duration
        VARCHAR intensity
        DATE date
    }

    DailySteps {
        INT step_id PK
        INT user_id FK
        DATE step_date
        INT steps
        DATETIME created_at
    }
```

Kuvakaappaukset sivuston käyttöliittymistä:
<img width="1898" height="877" alt="image" src="https://github.com/user-attachments/assets/82606602-79f9-4d2e-939d-69ab0985a8ae" />
<img width="1696" height="873" alt="image" src="https://github.com/user-attachments/assets/71bc0459-55cd-4412-8647-23f547b4d801" />
<img width="1897" height="843" alt="image" src="https://github.com/user-attachments/assets/bf04e667-2403-491f-aa12-b738e8386f39" />
<img width="1897" height="871" alt="image" src="https://github.com/user-attachments/assets/eba20030-4078-45d7-9459-106f050a13b4" />
<img width="1872" height="853" alt="image" src="https://github.com/user-attachments/assets/0cec98ce-a8de-4b16-bf2e-c215c07e8056" />

Toiminnallisuudet:
- Käyttäjän luominen
- käyttäjän sisäänkirjautuminen
- Käyttäjän päiväkirja merkintöjen haku, luominen ja poistaminen
- Käyttäjän BMI-indeksin laskeminen

Ongemat/bugit:
- käyttäjän sisäänkirjautuessa sivu ei automaattisesti päivity joten pitää manuaalisesti refresh sivu jotta käyttäjän tiedot haetaan.

Referenssit:
https://www.w3schools.com/
https://github.com/UllaSe/k2026-hyte-projekti-vite
https://github.com/mattpe/hyte-server-example-26

