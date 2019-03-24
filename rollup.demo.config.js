import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/demo/demo.tsx',

  output: {
    file: './build/demo.js',
    format: 'umd',

    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    }
  },

  external: ['react', 'react-dom'],
  
  plugins: [
    resolve(),
    commonjs(),
    replace({
      exclude: 'node_modules/**',
      
      values: {
        'process.env.NODE_ENV': "'development'"
      }
    }),
    typescript({
      tsconfigOverride: {
        include: ['./src/main/**/*.ts*', './src/demo/**/*.ts*']
      }
    }),
    serve({
      open: true,
      contentBase: '.',
      openPage: '/src/demo/index.html'
    }),
    livereload({
      watch: ['src/demo', 'build']
    })
  ]
}
