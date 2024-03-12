# coffee-user-svc
A simple Coffee Service User Authentication Service

Create a `config.json` file inside `src/configs` to start

```js
interface Config {
  port: number;
  postgres: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    synchronize: boolean;
    migrationRuns: boolean;
  };
}
```
