# FacilityPulse

FacilityPulse is a facility-hygiene operations application built as the Day 10 web-development final project. It turns site inspection records into a searchable work log and a transparent follow-up view. It is a distinct application from the earlier employee-management exercises and uses the facility-hygiene subject introduced in Day 3.

## Problem

Facility teams need a consistent way to keep a register of sites, record inspection observations, and find conditions that deserve follow-up. FacilityPulse stores facilities and their inspection history in a relational database, validates each record, and summarizes current operations in a dashboard.

The inspection band is a deterministic checklist, not an AI/ML prediction, diagnosis, or regulatory certification. Its contributing factors are saved with every record so users can review why a band was assigned.

## Features

- Facility register with search, active/inactive filtering, details, and CRUD operations.
- Inspection log with facility, inspector, and risk-band filters; create, read, update, and delete workflows.
- Server-side validation for all submitted fields, with browser constraints as a convenience.
- Overview metrics for active facilities, inspections, high-risk checks, and average cleanliness.
- Inspection detail pages show the observations and exact factors used by the risk checklist.
- JSON API for dashboard summaries, facility CRUD, and inspection CRUD.
- Demo data for three facilities and six inspections.
- A facility with inspection history cannot be deleted; deactivate it instead.
- Inactive facilities cannot receive new inspections.
- Responsive Blade interface, paginated lists, confirmation before inspection deletion, and useful empty/error states.

## Technology and Architecture

- **PHP 8.2+ and Laravel 12** provide routing, request validation, controllers, and server-rendered views.
- **Eloquent ORM and SQLite** provide persistent relational storage by default. Laravel's MySQL/MariaDB driver can be selected in `.env`.
- **Blade, CSS, and vanilla JavaScript** deliver the interface; **Vite** builds the local assets.
- **PHPUnit** feature tests exercise the web and API workflows against isolated in-memory SQLite.

Request flow:

```text
Browser form or JSON client
				-> web/API route
				-> Form Request validation
				-> controller
				-> Eloquent model and SQLite/MariaDB
				-> Blade page or JSON resource
```

`app/Services/RiskAssessmentService.php` is the separate domain rule. It adds points for low cleanliness, low odor score, waste level, unavailable water, complaints, and time since cleaning. A total of `0-2` is Low, `3-5` Moderate, and `6+` High. Footfall is stored as context and does not change the score. Inputs and triggered factors remain visible for human review.

## Requirements

- PHP 8.2 or later with `pdo_sqlite` enabled (or `pdo_mysql` for MySQL/MariaDB)
- Composer 2
- Node.js 20+ and npm

## Install and Run (PowerShell)

From the repository root:

```powershell
Set-Location .\day-10
composer install
Copy-Item .env.example .env
php artisan key:generate
if (-not (Test-Path .\database\database.sqlite)) { New-Item -ItemType File .\database\database.sqlite | Out-Null }
php artisan migrate --seed
npm install
npm run build
php artisan serve
```

Open `http://127.0.0.1:8000`. Demo seeding is repeatable and does not delete existing records. During development, run `npm run dev` in another terminal instead of `npm run build`.

## Database Configuration

The committed `.env.example` selects SQLite and requires no credentials. The local SQLite database file is ignored by Git. To use MariaDB/MySQL, create a database and set these values in your untracked `.env`:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=facilitypulse
DB_USERNAME=your_local_user
DB_PASSWORD=your_local_password
```

Then run `php artisan migrate --seed`. Keep credentials and the generated application key out of Git. Tests always use in-memory SQLite, regardless of local `.env` settings.

## API

Base URL: `http://127.0.0.1:8000/api`. Send and receive JSON. This is a local, single-user demo without authentication; add authentication and authorization before exposing it to a public network.

| Method | Path                                      | Purpose                                                    |
| ------ | ----------------------------------------- | ---------------------------------------------------------- |
| GET    | `/dashboard`                              | Summary counts, cleanliness average, and risk distribution |
| GET    | `/facilities?search=&status=`             | Paginated facility list with optional filters              |
| POST   | `/facilities`                             | Create facility                                            |
| GET    | `/facilities/{id}`                        | Read facility                                              |
| PUT    | `/facilities/{id}`                        | Update facility                                            |
| DELETE | `/facilities/{id}`                        | Delete only with no inspection history; otherwise `409`    |
| GET    | `/inspections?search=&risk=&facility_id=` | Paginated inspection log with filters                      |
| POST   | `/inspections`                            | Create inspection and calculate its risk band              |
| GET    | `/inspections/{id}`                       | Read inspection, facility, and assessment factors          |
| PUT    | `/inspections/{id}`                       | Update observations and recalculate the band               |
| DELETE | `/inspections/{id}`                       | Delete inspection                                          |

Validation failures return HTTP `422` with `message` and `errors`; missing records return `404`. Example create-inspection body:

```json
{
    "facility_id": 1,
    "inspector": "Mira Joshi",
    "inspected_at": "2026-09-27T09:30:00",
    "cleanliness_score": 4,
    "odor_score": 4,
    "waste_level": "low",
    "water_available": true,
    "footfall": 86,
    "complaints": 0,
    "hours_since_cleaning": 2
}
```

## Tests and Quality Checks

```powershell
php artisan test
composer validate --no-check-publish
npm run build
```

The feature suite covers dashboard and list rendering, facility CRUD and history protection, inspection CRUD and filtering, validation errors, web form submission, and individual risk-rule factors.

## Project Structure

```text
day-10/
├── app/
│   ├── Http/Controllers/       # Browser and JSON request handlers
│   ├── Http/Requests/          # Server-side input validation
│   ├── Http/Resources/         # JSON representations
│   ├── Models/                 # Facility and Inspection relations
│   └── Services/               # Transparent risk checklist
├── database/
│   ├── migrations/             # Relational schema
│   └── seeders/                # Repeatable sample records
├── resources/
│   ├── css/                    # Responsive application styling
│   ├── js/                     # Browser interactions
│   └── views/                  # Dashboard, lists, forms, and details
├── routes/                     # Web and JSON API endpoints
├── tests/Feature/              # Application/API workflow checks
├── .env.example
├── composer.json
└── package.json
```

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
