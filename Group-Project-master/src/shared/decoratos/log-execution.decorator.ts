export function LogExecutionTime(): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const start = Date.now();
      const result = originalMethod.apply(this, args);
      const end = Date.now();
      const executionTime = end - start;
      console.log(
        `Execution time of ${propertyKey.toString()}: ${executionTime}ms`,
      );

      return result;
    };

    return descriptor;
  };
}
