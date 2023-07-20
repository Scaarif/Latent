# Latent - House-finding Made Easy
![Latent cover image](https://github.com/Scaarif/Latent/blob/readme/latent_cover.jpg)

## Table of contents
- [Introduction](#introduction)
- [Features](#features)
  - [Rich Search Options](#rich-search-options)
  - [Agent Appointments](#agent-appointments)
  - [View Agent Rating](#view-agent-rating)
  - [Advertise Houses for Rent](#advertise-houses-for-rent)
  - [Seek a Roommate](#seek-a-roommate)
- [Technology Stack](#technology-stack)
- [Setup](#setup)
- [API](#api)
- [Authors](#authors)
  - [Joseph Alikah](#joseph-alikah)
  - [Gideon Obiasor](#gideon-obiasor)
  - [Rahab Mary](#rahab-mary)
  - [Greenbel Eleghasim](#greenbel-eleghasim)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Introduction
Ever found yourself in a situation where you needed to relocate to a new place, and the idea of doing a house search was not so thrilling?

Perhaps you are an agent looking to let the world know what you have got to offer, or a tenant looking to cut rent costs, have companionship, etc, and need a roommate. In any case, we have got you covered.

Latent is a web service that is intended to meet these needs by basically connecting people looking for housing accommodation with those offering them.

This service aims to make it easier for users to find accommodation, and for landlords and agents to advertise them.

## Features
The following highlights some of the features of Latent:

### Rich Search Options
From house location to price ranges, the search options are varied, allowing you to more likely find just what you are looking for.

![Search filter image](https://github.com/Scaarif/Latent/blob/bugs/search.png)

### Agent Appointments
See what you like? We provide an easy way to inform the agent, or roommate, of your interest, and get the both parties together.

![Appointment-booking image](https://github.com/Scaarif/Latent/blob/bugs/appointment.png)

### View Agent Rating
Looking for an agent with a good service-delivery track record? Your decision-making process can be made easier by viewing agent ratings.

![Agent rating image](https://github.com/Scaarif/Latent/blob/bugs/request_agent_contact.png)

### Advertise Houses for Rent
As a registered agent, you can post house listings and they will appear in searches whose filters match the house attributes (e.g. location and amenities like water).

![Image demonstrating house posting feature](https://github.com/Scaarif/Latent/blob/bugs/house_posting.png)

### Seek a roommate
Looking to cut rent costs? Feeling lonely and in need of a companion? You can put your currently rented apartment up to be shared.

![Image showing house sharing feature](https://github.com/Scaarif/Latent/.....)

## Technology Stack
Having had some experience with the `LEMP` (Linux, Nginx, MySQL, and Python) stack, the team decided to try out the `MERN` stack.

- `M`: MongoDB was used as the main database
- `E`: Express provided the web framework
- `R`: React was used in the frontend
- `N`: Nodejs was the language spoken at the backend

## Setup
Setup is easy. To start the project:
- clone the project repo:
```sh
git clone https://github.com/Scaarif/Latent
```
- cd into the root of the cloned repo directory
```sh
cd Latent/
```
- run setup
```sh
./setup.sh
```

## API
The backend exposes the following RESTful APIs to the frontend to provide business logic and database communication:

**/api/v1/login**
- `POST`: creates a login session for a user

**/api/v1/logout**
- `POST`: clears a user's login session

**/api/v1/users?userId=<>**
- `POST`: creates a new user
- `PUT`: updates a user's profile information
- `GET`: returns a user's data
- `DELETE`: removes a user's account and associated data from the database

**/api/v1/reset-password**
- `PUT`: handles changing of passwords, and resetting of forgotten ones

**/api/v1/houses**
- `POST`: creates a new house listing
- `PUT`: updates a house listing's data
- `GET`: returns all house objects linked to an agent, or any query string parameters
- `DELETE`: removes an agent's house listing

**/api/v1/agents/:agentId**
- `GET`: returns an agent's data without contact information

**/api/v1/appointments/:houseId**
- `POST`: establishes a user's interest in a house listing

## Authors
### Joseph Alikah
[LinkedIn](https://www.linkedin.com/in/ehijoe) | [GitHub](https://github.com/Ehijoe) | [Twitter](https://twitter.com/JosephAlikah)

A Software Engineer who loves making secure and efficient software solutions to everyday problems
### Gideon Obiasor
[LinkedIn](https://www.linkedin.com/in/obiasor-gideon-46116418b) | [GitHub](https://github.com/DrPlain) | [Twitter](https://twitter.com/Obiasor?t=CmNLHVYnp_1elPnjj8RD9g&s=09)

A full stack developer with a  knack for problem-solving and a passion for creating robust and user-friendly applications
### Rahab Mary
[LinkedIn](https://www.linkedin.com/in/mary-rahab/) | [GitHub](https://github.com/Scaarif) | [Twitter](https://twitter.com/ScaarifN)

A software engineer living the dream - thinking, dreaming, conceptualizing and building - it doesn't get any better than that!
### Greenbel Eleghasim
[LinkedIn](https://linkedin.com/in/greenbele) | [GitHub](https://github.com/coldplayz) | [Twitter](https://twitter.com/GreenbelE)

Greenbel is a software engineer who loves eating problems for breakfast, lunch and dinner. He is interested in logic, systems, efficiency and seeing things work, generally.

## Acknowledgements
- Holberton School staff and mentors, for their support and guidance through the course of the rigorous program
- [Maerteen Van Middelaar](https://twitter.com/maartenvm19), for his invaluable insights, being a software engineer of over 20 years
- All Holberton School students of cohort 8 for their network of support
- **YOU**, for taking the time to go through this documentation

## Attribution
<a href="https://www.freepik.com/free-photo/wood-sideboard-green-living-room-with-copy-space_36566024.htm#query=green%20home%20background&position=1&from_view=keyword&track=ais">Image by wuttichai1983</a> on Freepik

## License
MIT License
