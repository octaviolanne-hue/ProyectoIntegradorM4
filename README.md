# Taskify

Taskify es una aplicación web de gestión de tareas desarrollada con React y TypeScript. Permite a cada usuario registrarse e iniciar sesión, crear y administrar sus tareas y recibir un resumen de sus tareas por correo electrónico.

La aplicación utiliza Firebase Authentication para la autenticación de usuarios, Firestore para almacenar las tareas de forma independiente por usuario y AWS SES para el envío de resúmenes por email.

## 🚀 Funcionalidades

* Registro con email y contraseña.
* Inicio de sesión con email y contraseña.
* Inicio de sesión con Google.
* Cierre de sesión.
* Rutas protegidas para usuarios autenticados.
* Creación de tareas.
* Edición de tareas.
* Eliminación de tareas.
* Marcar tareas como completadas.
* Persistencia de tareas en Firestore.
* Tareas separadas por usuario.
* Estadísticas de tareas:

  * Total.
  * Completadas.
  * Pendientes.
* Envío de resumen de tareas por email.
* Eliminación de cuenta.
* Manejo de errores en operaciones principales.
* Interfaz responsive para móvil, tablet y desktop.
* Tests unitarios y de componentes.

---

## 🛠️ Tecnologías utilizadas

### Frontend

* React
* TypeScript
* React Router
* Vite
* CSS

### Autenticación y base de datos

* Firebase Authentication
* Firebase Firestore

### Email

* AWS SES
* AWS SDK
* Vercel Serverless Functions

### Testing

* Vitest
* React Testing Library
* Testing Library User Event
* jsdom

### Deploy

* Vercel
* GitHub

---

# 🏗️ Decisiones arquitectónicas

El proyecto fue organizado separando las responsabilidades principales de la aplicación.

```text
src/
├── components/
├── features/
├── hooks/
├── pages/
├── routes/
├── services/
├── test/
└── types/

api/
└── send-email.ts
```

### Componentes

Los componentes contienen partes reutilizables de la interfaz.

Por ejemplo:

* `TaskLibrary`: muestra la lista de tareas.
* `TaskDetails`: muestra y administra la tarea seleccionada.
* `TaskForm`: formulario para crear y editar tareas.
* `UserPanel`: información del usuario, estadísticas y acciones.
* `TasksNavbar`: navegación de la página principal de tareas.

Esto permite mantener la página `Tasks` organizada y evitar concentrar toda la interfaz en un único componente.

### Pages

Las páginas representan las diferentes vistas de la aplicación:

* `Home`
* `Login`
* `Register`
* `Tasks`
* `Info`

### Services

Las operaciones externas se separaron de los componentes.

Por ejemplo:

* `auth.ts`: operaciones relacionadas con Firebase Authentication.
* `firebase.ts`: configuración de Firebase.
* `firestore.ts`: conexión con Firestore.
* `tasks.ts`: operaciones CRUD de tareas.
* `email.ts`: comunicación con el endpoint de envío de emails.

Esta separación permite que los componentes se concentren principalmente en la interfaz y el estado de la aplicación.

### Autenticación

La autenticación se centralizó mediante `AuthContext`.

El contexto utiliza `onAuthStateChanged` de Firebase para conocer el usuario actualmente autenticado y compartir esta información con los componentes que la necesitan.

Además, `ProtectedRoute` impide acceder a `/tasks` cuando no existe un usuario autenticado.

### Persistencia de tareas

Las tareas se almacenan en Firestore utilizando una estructura asociada al usuario:

```text
users/{userId}/tasks/{taskId}
```

De esta forma, cada usuario solamente trabaja con sus propias tareas.

Las reglas de seguridad de Firestore verifican que el usuario autenticado coincida con el `userId` de la ruta.

### Variables de entorno

Las variables sensibles, especialmente las credenciales de AWS, no se almacenan directamente en el código fuente.

El archivo `.env` se mantiene fuera del repositorio mediante `.gitignore`.

Se incluye `.env.example` como referencia para conocer qué variables necesita el proyecto.

---

# 📦 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/octaviolanne-hue/ProyectoIntegradorM4.git
```

Entrar al proyecto:

```bash
cd ProyectoIntegradorM4
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Completar las variables indicadas en la sección correspondiente.

## 4. Ejecutar el proyecto

```bash
npm run dev
```

Vite iniciará el servidor de desarrollo.

## 5. Ejecutar los tests

```bash
npm test
```

## 6. Crear el build de producción

```bash
npm run build
```

---

# 🔐 Variables de entorno

El proyecto necesita las siguientes variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

SES_FROM_EMAIL=
```

### Firebase

Las variables `VITE_FIREBASE_*` corresponden a la configuración de la aplicación web de Firebase.

Estas variables son utilizadas por el frontend para inicializar Firebase.

### AWS

Las siguientes variables son utilizadas exclusivamente en el servidor para enviar emails mediante AWS SES:

```env
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
SES_FROM_EMAIL=
```

Las credenciales privadas de AWS **no deben exponerse en el frontend ni subirse al repositorio**.

---

# 📧 Flujo de envío de emails

El envío de emails se implementó utilizando AWS SES mediante una función serverless de Vercel.

El flujo funciona de la siguiente manera:

```text
Usuario
   ↓
Taskify
   ↓
Botón "Enviar resumen"
   ↓
Tasks.tsx
   ↓
services/email.ts
   ↓
POST /api/send-email
   ↓
Vercel Serverless Function
   ↓
AWS SES
   ↓
Email del usuario
```

Cuando el usuario presiona **"Enviar resumen"**, Taskify genera un resumen con:

* Cantidad total de tareas.
* Cantidad de tareas pendientes.
* Cantidad de tareas completadas.
* Lista de tareas.
* Estado de cada tarea.

El frontend envía estos datos al endpoint:

```text
/api/send-email
```

La función ubicada en:

```text
api/send-email.ts
```

recibe la información y utiliza el SDK de AWS para enviar el correo mediante SES.

Las credenciales de AWS permanecen únicamente en las variables de entorno del servidor.

De esta forma, el frontend nunca necesita conocer ni manejar directamente las credenciales privadas de AWS.

---

# 🧪 Testing

El proyecto utiliza Vitest y React Testing Library.

Se realizaron tests sobre los principales componentes y flujos de la aplicación.

Entre los casos comprobados se encuentran:

* Renderizado de tareas.
* Selección de tareas.
* Creación de tareas.
* Edición de tareas.
* Actualización del estado de una tarea.
* Eliminación de tareas.
* Inicio y cierre de sesión.
* Envío del resumen por email.
* Manejo de errores al cargar tareas.
* Interacción con formularios.

Actualmente el proyecto cuenta con:

```text
5 archivos de test
24 tests
24 tests pasando
```

---

# 🤖 Uso de IA durante el desarrollo

La inteligencia artificial se utilizó como herramienta de apoyo durante el proceso de desarrollo, principalmente para comprender conceptos, analizar errores, diseñar soluciones y revisar implementaciones.

No se utilizó solamente para generar código completo, sino también como herramienta de aprendizaje y acompañamiento durante las distintas etapas del proyecto.

## Situaciones donde fue más efectiva

La IA resultó especialmente útil para:

### Comprender conceptos nuevos

Durante el desarrollo aparecieron conceptos de React, TypeScript, Firebase, React Router y testing que requerían una explicación antes de poder utilizarlos correctamente.

Por ejemplo:

* `useState`
* `useEffect`
* `useContext`
* `ReactNode`
* interfaces de TypeScript
* props
* rutas protegidas
* parámetros dinámicos
* `useNavigate`
* `useLocation`
* Firebase Authentication
* Firestore
* mocks en testing

La IA permitió obtener explicaciones paso a paso y adaptar los ejemplos al código existente del proyecto.

### Resolver errores

También se utilizó para analizar errores de desarrollo y producción.

Por ejemplo, durante el deploy apareció un error relacionado con:

```text
Firebase: Error (auth/invalid-api-key)
```

El análisis permitió identificar que las variables de entorno de Firebase no estaban configuradas en Vercel.

También ayudó a identificar problemas relacionados con los dominios autorizados de Firebase para el inicio de sesión con Google.

### Arquitectura

La IA fue utilizada para analizar cómo separar responsabilidades entre:

```text
components/
services/
features/
routes/
types/
pages/
api/
```

Esto permitió evitar concentrar toda la lógica en un único componente.

### Testing

También fue utilizada para diseñar casos de prueba y entender cómo utilizar:

* Vitest.
* React Testing Library.
* `userEvent`.
* mocks.
* `waitFor`.

El objetivo fue probar comportamientos reales de la aplicación y no solamente comprobar que los componentes se renderizaran.

---

# 💡 Patrones y buenas prácticas descubiertos mediante el uso de IA

Uno de los principales aprendizajes fue utilizar la IA como una herramienta de acompañamiento y no como sustituto del razonamiento.

Algunos patrones utilizados fueron:

### 1. Separar responsabilidades

En lugar de colocar toda la lógica dentro de `Tasks.tsx`, las operaciones externas se separaron en servicios.

Por ejemplo:

```text
services/tasks.ts
services/auth.ts
services/email.ts
```

Esto hace que los componentes sean más fáciles de leer y mantener.

### 2. Tipar los datos

TypeScript permitió definir estructuras claras para las tareas:

```ts
interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}
```

Esto ayuda a detectar errores durante el desarrollo.

### 3. Validar estados de error

Las operaciones que dependen de servicios externos utilizan `try/catch` para manejar posibles errores.

Por ejemplo:

```text
Cargar tareas
      ↓
    try
      ↓
Firebase
      ↓
¿Funcionó?
   ↙     ↘
 sí       no
 ↓         ↓
mostrar   mostrar
datos     mensaje
```

Esto evita que un error de Firebase deje la interfaz sin información para el usuario.

### 4. Proteger información sensible

Las credenciales privadas de AWS se mantienen en variables de entorno y el envío de emails se realiza desde una función serverless.

Esto evita colocar secretos directamente en el código frontend.

### 5. Probar los comportamientos importantes

Los tests se enfocaron principalmente en acciones que el usuario realiza:

```text
crear
editar
completar
eliminar
seleccionar
enviar email
cerrar sesión
```

Esto permitió comprobar que los principales flujos de Taskify funcionaran correctamente.

### 6. Desarrollo iterativo

La IA fue más efectiva cuando se utilizó de forma incremental:

```text
Implementar
    ↓
Probar
    ↓
Detectar error
    ↓
Analizar
    ↓
Corregir
    ↓
Volver a probar
```

Este enfoque permitió entender mejor cada modificación y reducir el riesgo de introducir cambios innecesarios.

---

# 🌐 Producción

Taskify está desplegado en Vercel.

**URL de producción:**

https://taskify-nine-self.vercel.app

---

# 📁 Estructura principal

```text
project-root/
├── api/
│   └── send-email.ts
│
├── src/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── test/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
│
├── .env
├── .env.example
├── .gitignore
├── README.md
├── package.json
└── vite.config.ts
```

---

# 📌 Estado del proyecto

Taskify cumple con las funcionalidades principales planteadas para el proyecto integrador:

* Autenticación.
* Rutas protegidas.
* CRUD de tareas.
* Persistencia en Firestore.
* Envío de emails mediante AWS SES.
* Manejo de errores.
* Tests.
* Variables de entorno.
* Deploy en Vercel.
* Diseño responsive.
