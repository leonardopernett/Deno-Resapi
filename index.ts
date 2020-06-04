import {Application} from 'https://deno.land/x/oak/mod.ts'
import indexRouter from './router/index.router.ts'
import { organ } from "https://raw.githubusercontent.com/denjucks/organ/master/mod.ts";


const app = new Application();

app.use(organ('dev'))
app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());

console.log('server on port 3000')
await app.listen({port:3000})

