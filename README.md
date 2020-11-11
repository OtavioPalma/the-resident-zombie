# The Resident Zombie (Frontend)

A React and Redux project that allows survivors of an apocalypse to share items and their locations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Make sure to configure the backend project before proceeding

- Clone or Download the Project
- Run `yarn install` to install the dependencies in the local node_modules folder.
- Run `yarn start`, the dev server will load and open in your default web browser.

# How to Interact to the System

## HOME

- Information about me and the system

## ADD SURVIVOR

- Register yourself as a survivor and keep the system alive!
- Here we have a form to fill with the survivor information.
- We also have access to the survivor inventory, be sure to select every item you
  have here, since you won't be able to change it later but from trades!
- After fill every field and choose your items click `Create` to register your survivor.

## UPDATE LOCATION

- Been moving recently? Let others know of your last location!
- Here we have a Survivors List where you should select yourself.
- As soon as you select yourself upon the list a form will appear with your current coordinates, feel free to edit it.
- Click on `Save` to save the updated location.

## FLAG SURVIVOR

- Suspects someone has turned into a zombie? Report as soon as possible!
- Here we have a list of survivors where you should select yourself.
- As soon as you select yourself, another list pops up, here you should select the suspect survivor.
- Before confirm the report you should read the action column to ensure your selections are correct!
- Click on `Flag` to report the suspect!
- If the suspect was reported by another four survivors he gets flagged as INFECTED, you gain his inventory items and no one can interact with the infected survivor anymore.

## TRADE ITEMS

- Trade your items with other survivors!
- Here we have a list of survivors where you should select yourself.
- As soon as you select yourself another list pops up and your inventory appears side by side to a trade list.
- When you click in an item you should see the `trade column item's counter` increase and the `inventory column item's counter` decrease.
- In order to the trade be completed you should accumulate the same points of the other survivor, you can check it in the `Value` label below the items list.
- If the value is the same for both survivors the button `Trade` will be enabled, click it to confirm the trade!

## REPORTS

- Check information and statistics from every survivor registered (and infected) on the platform!
- Here we have information about the infection percentage, average items per survivor (non infected ones) and the amount of points lost by infections.

## Tests

- Run `yarn test` to check tests validities

## Built With

- React v17.0.1
- Create React App v4.0.0
- Redux v4.0.5
- React-Redux v7.2.2

## Missing Features

- Application responsiveness
- Google Maps API integration to select location
- False position security measure
- Solution to weapon problem
