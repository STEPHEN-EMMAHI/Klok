# Klok

## OVERVIEW

Klok is a timer tool that helps you know the current time, set a timer to be productive. This project is sorely for the purpose of learning and improve programming in javascript.

## TARGET USERS

- Students
- Teachers
- Entrepreneurs

## FEATURES

- Time Feature
- Alarm Feature
- Stopwatch Feature
- Timer Feature

## REQUIREMENTS

### Functional :

- Display current time and date to users
- Allow users to set a timer
- Allow users edit their own timer

### Non Functional :

- Application must be responsive
- Pages must load before or up to 3 seconds

### Constraints :

- Application should run on modern browsers
- Data will be lost upon refresh
- Light mode screens not yet set 

### Assumptions :

- Application requires internet access

## ARCHITECTURE

### Pattern :

MVC Architecture

### Stack :

- Frontend - HTML,Traditional CSS, Tailwind CSS, Vanilla Javascrip.
- Bundler - Vite

### Data Flow :

This section describes how data moves through the system when a user performs an action.

#### High-Level Data Flow

```text
 User Interacts with any app module
    ⬇
 Buttons and screens receive user's actions
    ⬇
 The appropriate module handles the action
    ⬇
 Fetch data from memory depending on particular action
    ⬆
 Updated information goes back to buttons and screens
    ⬆
 User sess result
```

#### Rendering Page

```text
 User opens the link
    ⬇
 Show navigation bar
    ⬆
 If page is fully loaded then immediately show time feature
    ⬆
 User sees time feature
```

#### Time Feature

```text
 Hide all features first
    ⬆
 Show only the time feature
    ⬆
 User sees time and date

NOTE: If user clicks on navigation time feature, also show the    time feature (time and date)
```

#### Timer Feature

```text
 User clicks on timer feature
    ⬇
 Background Process
    |--- Stop time and date recursing
    ⬆
 Hide all features first
    ⬆
 Show only the timer feature
    ⬆
 User interacts with
    |--- Keen slider wheel
    |--- Quick schedule timers (meeting, sleep, exercise)
    |--- Timer starters
```

##### Quick Schedule Timers

```text
 User clicks on a quick schedule eg. meeting
    ⬇
 Buttons and screens receive action
    ⬇
 Update quick schedule UI
    ⬆
 Change the wheel time to match that of the selected quick schedule
    ⬆
 User sees changes in wheel time
```

##### Timer Starters

```text

```

## HOW TO RUN THIS PROJECT

1. clone the project

```
git clone
```

2. install dependencies

```
npm install
```

3. run the development

```
npm run dev
```
