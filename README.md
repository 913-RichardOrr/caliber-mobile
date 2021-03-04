# caliber-mobile

## Introduction
  This project is a mobile version of the Caliber application which is a performance management suite used to collect and analyze evaluations of Revature trainees with the goal of increasing transparency, fostering informed decision making, and creating actionable information. Caliber takes input for any quality checkpoint from the beginning to the end of the associate lifecycle (screening, training, QC, panel, etc). The Caliber suite also provides a variety of reports on different levels of granularity using visual dashboards and tabular data.
  
  Caliber Mobile closely resembles the web version which was previously created by the internal dev-team at Revature but is styled and tailored instead to a mobile environment, including both Web and Android builds for phone usage.

## Technologies
* AWS SDK - version 2.818.0
* AWS Lambda
* AWS Gateway
* AWS S3
* PostgreSQL - version 8.5.1
* TypeScript - version 4.0.0
* React Native - 40.0.1
* Expo - version 40.0.0
* Redux - version 7.2.2
* Axios - version 0.21.1
* Firebase - version 8.2.7

## Current Features:
* User login and registration
* Account modification
* Instructors/Trainers can view all information for their batch overall and by week
* QC Team/Managers can modify QC notes as well as add new ones for associates.
* QC Team/Managers can select a technical status for an associate which will update overall batch technical status
* Managers can modify/add/remove categories from active list.
* All users of app can generate reports for a batch.

## Future Features
### Reports Tab Additions
* View report of either all associates of a week or a particular associate
* More visuals, such as pie charts for a more user-friendly experience
### Toast Notifications
* Validate user actions with toasts so that user can more easily identify when their actions succeed
### Performance Optimization
* Faster performance for a better user experience by making server requests less frequently
* Relying more on application state changes rather than database changes

## Usage
* Login for Trainer role:
  * Username: `trainer@revature.com`
  * Password: `password`
* Login for Quality Auditor role:
  * Username: `qc@revature.com`
  * Password: `password`
* Login for Manager role:
  * Username: `vp@revature.com`
  * Password: `password`
* Login for Trainer/QC role:
  * Username: `trainerqc@revature.com`
  * Password: `password`

## Getting Started
See SETUP.md for setting up project.

## Contributors
* [Medbh Campbell](https://github.com/medbhcampbell)
* [Kathryn Clark](https://github.com/kathrync23)
* [Jonathan Dawson](https://github.com/jedawson)
* [Kira Dieminger](https://github.com/kdieminger)
* [Cynthia Enciso](https://github.com/cyenciso)
* [Tequesha Gatling](https://github.com/tgatling)
* [Janine Geraldizo](https://github.com/jmGeraldizo)
* [Jeff Graham](https://github.com/jefferygraham)
* [Tyler Horn](https://github.com/thorn18)
* [Lilith Moore](https://github.com/lilypadlilith)
* [Asad Nazir](https://github.com/anazir100)
* [Shannon Nielsen](https://github.com/shannon-nielsen)
* [Nina Nguyen](https://github.com/ninancode) 
* [Nilam Patel](https://github.com/nilam2101)
* [Salman Saeed](https://github.com/algosal)
* [Emily Smith](https://github.com/Emily484)
* [Yasmine Smith](https://github.com/Ysmith54)
* [Jamie Tater](https://github.com/Tngtater9)
* [Cassandra Terry](https://github.com/Wewe34)
* [Robert Thompson](https://github.com/ratthompson)
* [Madhavi (Maddie) Thurlapati](https://github.com/maddiet1223)
* [Yuqing (Emma) Wang](https://github.com/whatemma)
* [Tashika Williams](https://github.com/Twilliams0897)
* [Jung (Michael) Woo](https://github.com/michaelwoo921)
* [Kirsten Wood](https://github.com/KirstenWood)
