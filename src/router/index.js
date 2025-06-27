import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index.js";
import NotFound from '../views/NotFound.vue'; 
import axiosService from "@/api/axios";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/teste",
      name: "teste",
      component: () => import("@/views/TesteView.vue"),
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/student",
      name: "student",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Student/HomeStudentView.vue"),
      meta: {
        requiresAuth: true,
        role: "student",
      },
    },
    {
      path: "/educator",
      name: "educator",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Educator/EducatorView.vue"),
      meta: {
        requiresAuth: true,
        role: "educator",
      },
    },
    {
      path: "/educator/createClassroom",
      name: "createClassroom",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Educator/CreateClassroom.vue"),
      meta: {
        requiresAuth: true,
        role: "educator",
      },
    },
    {
      path: "/educator/profile",
      name: "educatorProfile",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Educator/ProfileEducator.vue"),
      meta: {
        requiresAuth: true,
        role: "educator",
      },
    },
    {
      path: "/student/profile",
      name: "studentProfile",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Student/ProfileStudent.vue"),
      meta: {
        requiresAuth: true,
        role: "student",
      },
    },
    {
      path: "/educator/classes",
      name: "educatorClasses",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/ClassesView.vue"),
      meta: {
        requiresAuth: true,
        role: "educator",
      },
    },
    {
      path: "/student/classes",
      name: "studentClasses",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/ClassesView.vue"),
      meta: {
        requiresAuth: true,
        role: "student",
      },
    },
    {
      path: "/student/allClassrooms",
      name: "allClassrooms",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/Student/ClassesResultView.vue"),
      meta: {
        requiresAuth: true,
        role: "student",
      },
    },
    {
      path: "/educator/support",
      name: "support",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/SupportView.vue"),
      meta: {
        requiresAuth: true,
        role: "educator",
      },
    },
    {
      path: "/student/support",
      name: "studentSupport",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/SupportView.vue"),
      meta: {
        requiresAuth: true,
        role: "student",
      },
    },
    {
      path: "/educator/classroom/:id",
      name: "educatorClassroom",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Classes/ClasseView.vue"),
      meta: {
        requiresAuth: true,
        role: "educator",
      },
    },

    {
      path: "/student/classroom/:id",
      name: "studentClassroom",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Classes/ClasseView.vue"),
      meta: {
        requiresAuth: true,
        role: "student",
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: "login" });
    } else if (to.meta.role && to.meta.role !== store.getters.userRole) {
      switch (userRole) {

        case "student":
          next({ name: "student" });
          break;

        case "educator":
          next({ name: "educator" });
          break;

        case "admin":
          next({ name: "admin" });
          break;

        default:
          next({ name: "home" });
          break;
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

// Adicione uma rota de redirecionamento padrão para usuários autenticados
router.beforeEach((to, from, next) => {
  if (to.name === 'login' && store.getters.isAuthenticated) {
    const userRole = store.getters.userRole;
    if (userRole === 'admin') {
      next({ name: 'admin' });
    } else if (userRole === 'student') {
      next({ name: 'student' });
    } else if (userRole === 'educator') {
      next({ name: 'educator' });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  // Verifica se a rota começa com /student/ ou /educator/
  if (to.path.startsWith('/student') || to.path.startsWith('/educator')) {
    try {
      // Faz uma requisição ao backend para validar o token
      const response = await axiosService.validateToken();

      if (response.status === 200) {
        // Token válido, prossiga com a navegação
        next();
      } else {
        // Token inválido ou expirado, redireciona para logout
        store.dispatch("logout"); // Dispara a ação de logout
        window.location.reload();
      }
    } catch (error) {
      // Em caso de erro, assume que o token é inválido ou expirado
      store.dispatch("logout"); // Dispara a ação de logout
      window.location.reload();
    }
  } else {
    // Para outras rotas, prossiga normalmente
    next();
  }
});

export default router;
