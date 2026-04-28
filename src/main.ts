import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(new ValidationPipe())

    // Habilita CORS. Configure ALLOWED_ORIGINS como
    // "http://localhost:3000,http://localhost:5173" (exemplo)
    const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || ''
    const allowedOrigins = allowedOriginsEnv
        ? allowedOriginsEnv.split(',').map(s => s.trim())
        : ['http://localhost:3000']

    app.enableCors({
        origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
            if (!origin) return callback(null, true)
            if (allowedOrigins.includes(origin)) return callback(null, true)
            callback(new Error('Origin not allowed by CORS'))
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    })

    const port = process.env.PORT || 3001
    await app.listen(port)
    console.log(`🚀 Servidor rodando na porta ${port}`)
}

bootstrap()