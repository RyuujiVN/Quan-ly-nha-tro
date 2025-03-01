import userRoute from './user.route.js'
import dashboardRoute from "./dashboard.route.js"
import guestRoute from './guest.route.js'
import serviceRoute from './serviceRoute.js'
import boardingHouseRoute from './boardingHouseRoute.route.js'
import roomRoute from './room.route.js'

const route = (app) => {
    const version = "/api/v1";

    app.use(version + "/user", userRoute);

    app.use(version + "/dashboard", dashboardRoute);

    app.use(version + "/guest", guestRoute);

    app.use(version + "/service", serviceRoute);

    app.use(version + "/boarding-house", boardingHouseRoute);

    app.use(version + "/room", roomRoute);

}

export default route;