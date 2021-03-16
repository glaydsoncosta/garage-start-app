# Code Challenge - ITCrowd

![ITCrowd](itcrowd.png)

---

## Garage APP

![Screenshots](screenshots.png)

This repo is a working project that lists cars based on a local API response. It contains both the backend and the frontend app, and it aims at testing candidates' abilities to solve real-world problems, without demanding too much time setting up everything.

## Challenge

These tasks are recommended to be completed before the technical interview, so we can go over them and discuss the implementation.

### Backend

- [X] Implement a relational DataBase (use SQLite for simplicity), with two entities, one for Makers and another for Cars. Use the same fields as provided by `cars.json` file. Each Maker can have several Cars.

- [ ] Consider implementing a resizing and cache system for served images. What approach would you take? What libraries or services? There's no need to implement it fully, but an example or a simple implementation will be appreciated.

- [X] Images on `assets` folder are not being returned by the server. Can you spot what is missing?

- [X] Create a new detail endpoint that returns a single car.

  - [X] Extra: If you have implemented a new Detail Screen on the frontend app during homework, please refactor the frontend code to use this new endpoint.

- [X] Add a test case to certify the response of your new API endpoint.

### Frontend

- [ ] Implement a 'Detail' screen on the frontend app, following the same design principles and using the same information already provided.

- [ ] The images are bleeding their cells, causing the `scrollview` to scroll horizontally when it should be only vertical. Can you spot and fix this scenario?

- [ ] Improve main list implementation so it has better long term performance and allows for adding pagination in the future.

- [ ] Add persistence to "TOGGLE STAR" functionality.
