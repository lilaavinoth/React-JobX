import { Route, Routes } from "react-router-dom"
import Root from "./routes/root"
import PostJob from "./postJob"

function App() {
    return <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/postJob" element={<PostJob />} />

    </Routes>
}

export default App