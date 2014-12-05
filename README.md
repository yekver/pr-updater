Тестовое задания на вакансию в группу разработки инструментов
## pr-updater

Модуль для обновления описания PR в репозитории на github'е. Модуль имеет интерфейс командной строки, а также библиотечный API.
С помощью интерфейса командной строки пользователь, находясь в директории склонированного репозитория, имеет возможность работать с отдельными секциями описания определенного PR, не затрагивая при этом всю остальную часть описания.

### Данные
  - номер PR, id секции и текст задаются в командной строке при вызове
  - адрес репозитория вычисляются из текущего окружения
  - авторизационный токен должен вычитывается из конфигурационного файла, находящийся либо в рабочей директории либо в домашней директории пользователя

### Функциональность
  - добавить новую секцию
  - обновить существующую секцию
  - считать текст существующей секции
  - удалить секцию
  - удалить все секции


Библиотечный API обеспечивает возможность использования утилиты в качестве подключаемого модуля.

Основная функциональность покрыта unit-тестами.