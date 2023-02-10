import app from "./app"
import env from './utils/validateEnv'
import './config/db'

const port = env.PORT || 5555

app.listen(port, () => console.log(`server runing on port ${port}`))