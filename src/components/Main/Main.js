import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes, privateRoutes } from "~/routes";
import { DefaultLayout } from "~/layouts";
import storage from "~/until/storage";
import { Login } from "~/pages/Login";

function Main() {
  const isLogined = Array.isArray(storage.get())
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={isLogined ? <Navigate to="/login"/> : <Navigate to="/dashboard"/>}/>
        <Route path="/login" element={isLogined ? <Login /> : <Navigate to="/dashboard"/>} />
        <Route element={<PrivateRoutes/>}>
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout title={route.title || "asd"}>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        </Route>
      </Routes>
    </div>
  );
}

export default Main;
