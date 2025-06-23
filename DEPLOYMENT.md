# 🚀 Guía de Deployment - Lerni Web

## 📋 Requisitos Previos

- Cuenta de AWS con permisos administrativos
- Repositorio en GitHub
- Node.js 18+ (recomendado para desarrollo)

## 🔧 Configuración AWS

### 1. Crear Bucket S3

1. Ve a la consola de AWS S3
2. Create bucket:
   ```
   Bucket name: lerni-web-dev
   AWS Region: us-east-1
   Object Ownership: ACLs disabled
   Block all public access: ❌ DESMARCAR
   Bucket Versioning: Enable
   Default encryption: Enable (SSE-S3)
   ```

### 2. Configurar Static Website Hosting

1. En tu bucket > Properties > Static website hosting > Edit
2. Configuración:
   ```
   Static website hosting: Enable
   Hosting type: Host a static website
   Index document: index.html
   Error document: index.html
   ```

### 3. Bucket Policy

En Permissions > Bucket policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::lerni-web-dev/*"
        }
    ]
}
```

### 4. Usuario IAM para CI/CD

1. IAM > Users > Create user: `github-actions-lerni`
2. Create policy `GitHubActionsS3Deploy`:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::lerni-web-dev",
                "arn:aws:s3:::lerni-web-dev/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation"
            ],
            "Resource": "*"
        }
    ]
}
```

3. Asignar policy al usuario
4. Crear Access Keys y guardarlas

## 🔐 Secretos GitHub

En tu repo > Settings > Secrets and variables > Actions:

```
AWS_ACCESS_KEY_ID: [tu access key]
AWS_SECRET_ACCESS_KEY: [tu secret key]
AWS_REGION: us-east-1
S3_BUCKET_NAME: lerni-web-dev
REACT_APP_BASE_URL: https://tu-api.com
CLOUDFRONT_DISTRIBUTION_ID: [opcional]
```

## 🌐 CloudFront (Opcional)

Si quieres CDN global y HTTPS:

1. CloudFront > Create distribution
2. Configuración:
   ```
   Origin domain: lerni-web-dev.s3-website-us-east-1.amazonaws.com
   Protocol: HTTP only
   Viewer protocol policy: Redirect HTTP to HTTPS
   Allowed HTTP methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   Cache policy: Caching Optimized
   ```

3. Custom error pages:
   - 403: /index.html (HTTP 200)
   - 404: /index.html (HTTP 200)

## 🔄 Proceso de Deployment

### Automático (GitHub Actions)

1. Push a rama `dev`:
   ```bash
   git add .
   git commit -m "Deploy changes"
   git push origin dev
   ```

2. El workflow automáticamente:
   - Instala dependencias
   - Ejecuta linting
   - Corre tests (si existen)
   - Hace build de producción
   - Sube archivos a S3
   - Invalida CloudFront (si está configurado)

### Manual (Script Local)

```bash
# Configurar variables de entorno
export S3_BUCKET_NAME=lerni-web-dev
export AWS_REGION=us-east-1
export REACT_APP_BASE_URL=https://tu-api.com
export CLOUDFRONT_DISTRIBUTION_ID=E1234567890ABC  # opcional

# Ejecutar script
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## 🐛 Troubleshooting

### Error: npm ci fails with ERESOLVE

**Problema:** Conflictos de dependencias entre apexcharts y react-apexcharts

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Error: Cannot find module 'ajv/dist/compile/codegen'

**Problema:** Incompatibilidad de versiones ajv en Node.js 16

**Soluciones:**

1. **Upgrade Node.js a v18+** (recomendado)
2. **O usar el deployment automático** (GitHub Actions usa Node 18)
3. **O instalar con force:**
   ```bash
   npm install --legacy-peer-deps --force
   ```

### Build funciona en CI pero no localmente

**Causa:** Diferencias de versión Node.js

**Solución:** Usar nvm para cambiar a Node 18:
```bash
nvm install 18
nvm use 18
npm install
npm run build
```

### Archivos no se actualizan en el sitio

**Problema:** Cache del navegador o CloudFront

**Soluciones:**
1. Hacer hard refresh (Ctrl+F5)
2. Verificar que CloudFront invalidation se ejecutó
3. Verificar archivos en S3 bucket

## 📱 URLs Resultantes

- **S3 Website:** `http://lerni-web-dev.s3-website-us-east-1.amazonaws.com`
- **CloudFront:** `https://d1234567890abc.cloudfront.net`

## 🔄 Flujo de Trabajo Recomendado

1. Desarrollar en rama `feature/nueva-funcionalidad`
2. Merge a `dev` para deployment automático
3. Verificar en URL de staging
4. Merge a `main` para producción (si configurado)

## ⚡ Optimizaciones

El workflow está configurado para:
- ✅ Cache de npm para builds más rápidos
- ✅ Source maps deshabilitados en producción
- ✅ Cache headers optimizados (1 año para assets, no-cache para HTML)
- ✅ Archivos antiguos eliminados automáticamente
- ✅ Invalidación de CDN automática

## 📞 Soporte

Si tienes problemas con el deployment:
1. Revisa los logs en GitHub Actions
2. Verifica las credenciales AWS
3. Confirma que el bucket existe y es público
4. Asegúrate que todas las variables de entorno están configuradas 