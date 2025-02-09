import userRoute from './user.route.js'
import dashboardRoute from "./dashboard.route.js"

const route = (app) => {
    const version = "/api/v1";

    app.use(version + "/user", userRoute);

    app.use(version + "/dashboard", dashboardRoute);
}

export default route;