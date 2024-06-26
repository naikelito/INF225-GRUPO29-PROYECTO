En este apartado se explicará la obtención de los data tests de rendimiento. 

Los datos recolectados se encuentran en la carpeta Loadtests separados por Hu, que para efectos de análisis los experimentos fueron hechos con el login, Obtención de médicos y obtención de clientes registrados. 

Login:

En esta parte se analizó el ingreso al portal de 1000 usuarios variando el tiempo en completar la acción, que puede ver que las carpetas se encuentran separadas con el formato "1000Uvs[T]s" donde el parámetro T corresponde al tiempo en completar el ingreso al login. Observando el comportamiento de las imágenes "Response_Time" comparten con que el gráfico de rendimiento transcurrido un tiempo inicia lentamente hasta llegar al valor pico de aproximadamente 14.000 milisegundos y luego desciende lentamente. pero esto no ocurre al completar la acción después de los 45 segundos o superior, lo que se puede interpretar que el servidor no logra saturarse al agregar un mayor tiempo para completar la tarea. Se estima que para este endpoint logra procesar alrededor de 71 solicitudes, que en este caso tomando una muestra, por ejemplo 1000 usuarios vs 30 segundos, se divide la cantidad de personas por el rendimiento (1000 personas sobre 14000ms ). 


Obtención de médicos:

De la misma manera se procede el análisis, pero tomando muestras de 2000 usuarios variando el tiempo en completar la tarea. También se separán las muestras según el mismo formato del login. En este apartado no pareciera ser muy preciso el rendimiento debido a que el valor pico alcanzado según las muestras están muy alejadas de una con otras, sobre todo si usted observa la muestra de 2000 usuarios vs 20 segundos con las demás, aunque pareciera estabilizarse en las últimas tres muestras, motivo por el cual se descartará la de 20 segundos. Para obtener el valor con que procesa las solicitudes el servidor se obtendrá el promedio entre las tres muestras según el procedimiento realizado en el login:

- 30 segundos -> se procesan 8333 solicitudes por segundo
- 35 segundos -> se procesan 5405 solicitudes por segundo
- 40 segundos -> se procesan 8695 solicitudes por segundo  

El promedio es de 7477 solicitudes por segundo



Obtención de clientes:

Se sigue el mismo formato que las anteriores. En primera instancia se observa del gráfico de 2000 usuarios vs 20 segundos el valor pico aún no se alcanza, por lo que el servidor logra manejar las solicitudes entrantes. Puede parecer curioso, porque al gregar más tiempo como se ven en las muestras posteriores si llegan a un valor pico y comienzan a estabilizarse, lo que sería inconsistente con la primera muestra. probablemente se deba a que al reducir el tiempo y aumentar la cantidad de usuarios haya mayor error al tomar los datos, ya sea porque el proceso debe ser expedito y entre petición y petición hayan datos perdidos, por lo que se ignorará la muestra de 20 segundos.  

- 30 segundos -> se procesan 11764 solicitudes por segundo
- 40 segundos -> se procesan 18181 solicitudes por segundo

- El promedio entre las dos muestras son de 14972 solicitudes por segundo

Como se observa, Según el endpoint solicitado, el servior puede procesar más o menos solicitudes y esto se debe principalmente a como se manejan los datos y la eficiencia del código realizado. Por otro lado, observe que las solicitudes llegan hasta un valor pico donde el servidor no puede manejar más, principalmente es que ha llegado a su límite y posteriormente rechaza las solicitudes http para liberar recurso, reducir tiempo de respuesta y tener un mayor control de las operaciones; Luego por esa razón en algunas gráficas la pendiente comienza a bajar. Se impuso un rendimiento límite de 10 solicitudes por segundo (en el caos del login) donde el servidor debiese procesar bajo una situación de carga, aunque los resultados parecen indicar que puede soportar mucho más para agilizar el proceso. 
