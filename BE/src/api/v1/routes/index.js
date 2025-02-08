import userRoute from './user.route.js'

const route = (app) => {
    const version = "/api/v1";

    app.use(version + "/user", userRoute);
}

export default route;