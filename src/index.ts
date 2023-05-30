import Koa from "koa";
import Router from "@koa/router";

const app = new Koa();
const router = new Router();

app.use(async (context, next) => {
  await next();
  const responseTime = context.response.get("X-Response-Time");
  console.log(`Response time ${responseTime} ms`);
});

app.use(async (context, next) => {
  const start = new Date();
  await next();
  const end = new Date();
  context.response.set("X-Response-Time", `${end.getTime() - start.getTime()}`);
});

router.get("/hello", async (context, next) => {
  context.response.body = "hello world";
  const timeout = Math.floor(Math.random() * 1000);
  return new Promise<void>((resolve) => setTimeout(() => resolve(), timeout));
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8080);
