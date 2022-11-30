<template>
  <nav class="navbar navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Covid 19 Mundo</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="offcanvas offcanvas-end text-bg-dark"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Covid 19</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <!-- <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <router-link
              tag="li"
              class="nav-item"
              active-class="active"
              to="/"
              exact
              ><a class="nav-link">Home</a></router-link
            >
            <router-link
              tag="li"
              class="nav-item"
              active-class="active"
              to="/about"
              exact
              ><a>About</a></router-link
            >
            <router-link
              tag="li"
              class="nav-item"
              active-class="active"
              to="/resume"
              exact
              ><a>Curriculo</a></router-link
            >
          </ul> -->
          <ul class="nav nav-pills flex-column mb-auto">
        <router-link
          tag="li"
          class="nav-link text-white"
          active-class="active"
          to="/"
          exact
          ><a>Home</a></router-link
        >
        <router-link
          tag="li"
          class="nav-link text-white"
          active-class="active"
          to="/about"
          exact
          ><a>About</a></router-link
        >
        <router-link
          tag="li"
          class="nav-link text-white"
          active-class="active"
          to="/resume"
          exact
          ><a>Curriculo</a></router-link
        >
      </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
