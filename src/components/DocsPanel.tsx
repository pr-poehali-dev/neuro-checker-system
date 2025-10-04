import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const DocsPanel = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-[#0d1117] border-[#00FF41]/30">
        <CardHeader>
          <CardTitle className="text-[#00FF41] flex items-center gap-2">
            <Icon name="Book" className="w-5 h-5" />
            Документация системы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[700px] pr-4">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="intro" className="border border-[#00FF41]/20 rounded px-4 bg-[#0a0e1a]">
                <AccordionTrigger className="text-[#00FF41] hover:text-[#00FF41]/80">
                  <div className="flex items-center gap-2">
                    <Icon name="Info" className="w-4 h-4" />
                    Введение в систему
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#00FFFF] space-y-3 pt-3">
                  <p>
                    <strong className="text-[#00FF41]">AI Code Analyzer</strong> — это продвинутая система 
                    анализа кода, использующая 5 различных AI моделей для обнаружения ошибок, 
                    уязвимостей и проблем производительности.
                  </p>
                  <p>
                    Каждая модель проверяет код минимум <Badge variant="outline" className="text-[#00FFFF] border-[#00FFFF]">3 раза</Badge>, 
                    предварительно изучая актуальную документацию в интернете для каждой команды.
                  </p>
                  <div className="bg-[#0d1117] p-3 rounded border border-[#00FF41]/20 mt-3">
                    <p className="text-sm">
                      <Icon name="Lightbulb" className="w-4 h-4 inline mr-1" />
                      Это гарантирует максимальную точность анализа и минимизирует ложные срабатывания.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="models" className="border border-[#00FF41]/20 rounded px-4 bg-[#0a0e1a]">
                <AccordionTrigger className="text-[#00FF41] hover:text-[#00FF41]/80">
                  <div className="flex items-center gap-2">
                    <Icon name="Brain" className="w-4 h-4" />
                    Используемые AI модели
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#00FFFF] space-y-4 pt-3">
                  <div className="space-y-3">
                    <div className="bg-[#0d1117] p-3 rounded border border-[#00FF41]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#00FF41] text-black">GPT-4 Turbo</Badge>
                      </div>
                      <p className="text-sm">
                        Лучшая модель для анализа сложной логики и архитектурных паттернов. 
                        Отлично находит логические ошибки и проблемы проектирования.
                      </p>
                    </div>

                    <div className="bg-[#0d1117] p-3 rounded border border-[#00FF41]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#00FF41] text-black">Claude 3 Opus</Badge>
                      </div>
                      <p className="text-sm">
                        Специализируется на обнаружении неиспользуемого кода, заглушек и 
                        недоделанных функций. Максимально внимательна к деталям.
                      </p>
                    </div>

                    <div className="bg-[#0d1117] p-3 rounded border border-[#00FF41]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#00FF41] text-black">Gemini Pro</Badge>
                      </div>
                      <p className="text-sm">
                        Фокусируется на производительности и оптимизации. Выявляет медленные 
                        алгоритмы, неэффективные структуры данных.
                      </p>
                    </div>

                    <div className="bg-[#0d1117] p-3 rounded border border-[#00FF41]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#00FF41] text-black">Mistral Large</Badge>
                      </div>
                      <p className="text-sm">
                        Экспертиза в области безопасности. Находит уязвимости, проблемы 
                        с аутентификацией, SQL injection, XSS и другие угрозы.
                      </p>
                    </div>

                    <div className="bg-[#0d1117] p-3 rounded border border-[#00FF41]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#00FF41] text-black">LLaMA 3.1</Badge>
                      </div>
                      <p className="text-sm">
                        Проверяет соответствие best practices, стандартам кодирования и 
                        общепринятым паттернам разработки.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="workflow" className="border border-[#00FF41]/20 rounded px-4 bg-[#0a0e1a]">
                <AccordionTrigger className="text-[#00FF41] hover:text-[#00FF41]/80">
                  <div className="flex items-center gap-2">
                    <Icon name="GitBranch" className="w-4 h-4" />
                    Рабочий процесс
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#00FFFF] space-y-3 pt-3">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#00FF41] text-black rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        1
                      </div>
                      <div>
                        <p className="font-semibold text-[#00FF41]">Подготовка кода</p>
                        <p className="text-sm">
                          Вставьте код в редактор на вкладке "Анализатор". Система автоматически 
                          определит язык и структуру.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#00FF41] text-black rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        2
                      </div>
                      <div>
                        <p className="font-semibold text-[#00FF41]">Запуск анализа</p>
                        <p className="text-sm">
                          Нажмите "Запустить анализ". Каждая AI модель начнёт проверку кода, 
                          предварительно изучая документацию команд.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#00FF41] text-black rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        3
                      </div>
                      <div>
                        <p className="font-semibold text-[#00FF41]">Множественная проверка</p>
                        <p className="text-sm">
                          Каждая модель проверяет код 3 раза, каждый раз заново анализируя 
                          строчка за строчкой для гарантии точности.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#00FF41] text-black rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        4
                      </div>
                      <div>
                        <p className="font-semibold text-[#00FF41]">Формирование отчёта</p>
                        <p className="text-sm">
                          Система объединяет результаты всех проверок и формирует детальный отчёт 
                          с объяснением найденных проблем.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#00FF41] text-black rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        5
                      </div>
                      <div>
                        <p className="font-semibold text-[#00FF41]">Выборочное исправление</p>
                        <p className="text-sm">
                          Просмотрите найденные проблемы, выберите нужные и примените исправления 
                          одним кликом.
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="reports" className="border border-[#00FF41]/20 rounded px-4 bg-[#0a0e1a]">
                <AccordionTrigger className="text-[#00FF41] hover:text-[#00FF41]/80">
                  <div className="flex items-center gap-2">
                    <Icon name="FileText" className="w-4 h-4" />
                    Работа с отчётами
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#00FFFF] space-y-3 pt-3">
                  <p>
                    На вкладке "Отчёты" вы найдёте детальный анализ вашего кода:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="ChevronRight" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong className="text-[#00FF41]">Общая статистика</strong> — количество проверок, 
                        найденных проблем, время анализа
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="ChevronRight" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong className="text-[#00FF41]">Детальный отчёт по моделям</strong> — результаты 
                        каждой AI с конкретными находками
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="ChevronRight" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong className="text-[#00FF41]">Понимание кода</strong> — описание того, 
                        что делает ваш код максимально понятным языком
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fixes" className="border border-[#00FF41]/20 rounded px-4 bg-[#0a0e1a]">
                <AccordionTrigger className="text-[#00FF41] hover:text-[#00FF41]/80">
                  <div className="flex items-center gap-2">
                    <Icon name="Wrench" className="w-4 h-4" />
                    Исправление ошибок
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#00FFFF] space-y-3 pt-3">
                  <p>
                    Вкладка "Исправления" позволяет контролировать процесс фиксинга:
                  </p>
                  <div className="space-y-3 mt-3">
                    <div className="bg-[#0d1117] p-3 rounded border border-[#00FF41]/20">
                      <p className="font-semibold text-[#00FF41] mb-2">Выборочное применение</p>
                      <p className="text-sm">
                        Вы можете выбрать только те исправления, которые хотите применить. 
                        Используйте чекбоксы для выбора.
                      </p>
                    </div>

                    <div className="bg-[#0d1117] p-3 rounded border border-[#00FF41]/20">
                      <p className="font-semibold text-[#00FF41] mb-2">Предпросмотр изменений</p>
                      <p className="text-sm">
                        Для каждого исправления показывается текущий код и предлагаемое изменение, 
                        чтобы вы могли оценить корректность.
                      </p>
                    </div>

                    <div className="bg-[#0d1117] p-3 rounded border border-[#00FF41]/20">
                      <p className="font-semibold text-[#00FF41] mb-2">Верификация</p>
                      <p className="text-sm">
                        Перед применением каждое исправление дополнительно проверяется, 
                        чтобы не сломать работающий код.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="settings" className="border border-[#00FF41]/20 rounded px-4 bg-[#0a0e1a]">
                <AccordionTrigger className="text-[#00FF41] hover:text-[#00FF41]/80">
                  <div className="flex items-center gap-2">
                    <Icon name="Settings" className="w-4 h-4" />
                    Настройка параметров
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#00FFFF] space-y-3 pt-3">
                  <p>На вкладке "Настройки" вы можете настроить:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="ChevronRight" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Какие AI модели использовать для анализа</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="ChevronRight" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Количество проверок на каждую модель (1-5 раз)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="ChevronRight" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Включить/выключить поиск в интернете</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="ChevronRight" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Строгость анализа (обычный/строгий режим)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="ChevronRight" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Минимальный уровень важности ошибок</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="ChevronRight" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Типы проверок (безопасность, производительность, etc.)</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tips" className="border border-[#00FF41]/20 rounded px-4 bg-[#0a0e1a]">
                <AccordionTrigger className="text-[#00FF41] hover:text-[#00FF41]/80">
                  <div className="flex items-center gap-2">
                    <Icon name="Sparkles" className="w-4 h-4" />
                    Советы по использованию
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#00FFFF] space-y-3 pt-3">
                  <div className="space-y-3">
                    <div className="bg-[#0d1117] p-3 rounded border border-[#00FF41]/20">
                      <p className="text-sm">
                        <Icon name="Lightbulb" className="w-4 h-4 inline mr-1 text-[#FFA500]" />
                        <strong className="text-[#00FF41]">Для критичного кода</strong> используйте 
                        строгий режим и минимум 5 проверок на модель
                      </p>
                    </div>

                    <div className="bg-[#0d1117] p-3 rounded border border-[#00FF41]/20">
                      <p className="text-sm">
                        <Icon name="Lightbulb" className="w-4 h-4 inline mr-1 text-[#FFA500]" />
                        <strong className="text-[#00FF41]">Для быстрой проверки</strong> достаточно 
                        2-3 моделей с 3 проверками
                      </p>
                    </div>

                    <div className="bg-[#0d1117] p-3 rounded border border-[#00FF41]/20">
                      <p className="text-sm">
                        <Icon name="Lightbulb" className="w-4 h-4 inline mr-1 text-[#FFA500]" />
                        <strong className="text-[#00FF41]">Всегда включайте поиск в интернете</strong> — 
                        это гарантирует актуальность проверок
                      </p>
                    </div>

                    <div className="bg-[#0d1117] p-3 rounded border border-[#00FF41]/20">
                      <p className="text-sm">
                        <Icon name="Lightbulb" className="w-4 h-4 inline mr-1 text-[#FFA500]" />
                        <strong className="text-[#00FF41]">Внимательно изучайте отчёты</strong> перед 
                        применением исправлений — AI может ошибаться
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocsPanel;
