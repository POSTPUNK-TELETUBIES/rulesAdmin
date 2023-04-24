import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { dependencies } from './package.json'

const vendor = [ 'react', 'react-dom' ]

function renderChunks(deps: Record<string, string>) {
  const chunks = {}
  Object.keys(deps).forEach((key) => {
    if (vendor.includes(key)) return
    chunks[key] = [ key ]
  })
  return chunks
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    minify: true,
    rollupOptions:{
      output:{
        manualChunks:{
          vendor,
          ...renderChunks(dependencies)
        }
      }
    }
  }
})
