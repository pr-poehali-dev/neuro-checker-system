import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const ReportsPanel = () => {
  const mockReport = {
    timestamp: "2025-10-04 14:23:15",
    totalChecks: 15,
    aiModels: 5,
    foundIssues: 12,
    criticalErrors: 2,
    warnings: 7,
    suggestions: 3,
    codeLines: 245,
    executionTime: "3m 42s"
  };

  const detailedAnalysis = [
    {
      model: "GPT-4 Turbo",
      checks: 3,
      findings: "Обнаружены 2 критические уязвимости безопасности. Используется устаревший метод аутентификации без проверки токенов. Рекомендуется внедрить JWT с refresh токенами.",
      issues: [
        { line: 42, type: "error", desc: "SQL injection vulnerability в запросе пользователя" },
        { line: 89, type: "error", desc: "Пароли хранятся в открытом виде без хеширования" },
        { line: 156, type: "warning", desc: "Отсутствует валидация входных данных" }
      ]
    },
    {
      model: "Claude 3 Opus",
      checks: 3,
      findings: "Код содержит множественные неиспользуемые функции и переменные. Обнаружены заглушки в критических участках обработки платежей.",
      issues: [
        { line: 23, type: "warning", desc: "Функция calculateDiscount() объявлена но никогда не вызывается" },
        { line: 67, type: "warning", desc: "Переменная tempData не используется после инициализации" },
        { line: 134, type: "info", desc: "TODO комментарий указывает на незавершенную реализацию" }
      ]
    },
    {
      model: "Gemini Pro",
      checks: 3,
      findings: "Архитектурные проблемы с производительностью. Обнаружены O(n²) операции в циклах обработки больших данных.",
      issues: [
        { line: 178, type: "warning", desc: "Вложенные циклы создают квадратичную сложность" },
        { line: 201, type: "warning", desc: "Синхронные операции блокируют основной поток" },
        { line: 223, type: "info", desc: "Рекомендуется кеширование результатов запросов" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-[#0d1117] border-[#00FF41]/30">
        <CardHeader>
          <CardTitle className="text-[#00FF41] flex items-center gap-2">
            <Icon name="BarChart3" className="w-5 h-5" />
            Общая статистика анализа
          </CardTitle>
          <CardDescription className="text-[#00FFFF]">
            Последний анализ: {mockReport.timestamp}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#0a0e1a] p-4 rounded border border-[#00FF41]/20">
              <div className="text-2xl font-bold text-[#00FF41]">{mockReport.totalChecks}</div>
              <div className="text-xs text-[#00FFFF]">Всего проверок</div>
            </div>
            <div className="bg-[#0a0e1a] p-4 rounded border border-[#00FF41]/20">
              <div className="text-2xl font-bold text-[#FF6B6B]">{mockReport.criticalErrors}</div>
              <div className="text-xs text-[#00FFFF]">Критических ошибок</div>
            </div>
            <div className="bg-[#0a0e1a] p-4 rounded border border-[#00FF41]/20">
              <div className="text-2xl font-bold text-[#FFA500]">{mockReport.warnings}</div>
              <div className="text-xs text-[#00FFFF]">Предупреждений</div>
            </div>
            <div className="bg-[#0a0e1a] p-4 rounded border border-[#00FF41]/20">
              <div className="text-2xl font-bold text-[#4ECDC4]">{mockReport.suggestions}</div>
              <div className="text-xs text-[#00FFFF]">Рекомендаций</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#0d1117] border-[#00FF41]/30">
        <CardHeader>
          <CardTitle className="text-[#00FF41] flex items-center gap-2">
            <Icon name="FileSearch" className="w-5 h-5" />
            Детальный отчёт по моделям
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              {detailedAnalysis.map((analysis, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-[#00FF41]">{analysis.model}</h3>
                    <Badge variant="outline" className="text-[#00FFFF] border-[#00FFFF]">
                      {analysis.checks} проверки
                    </Badge>
                  </div>
                  
                  <div className="bg-[#0a0e1a] p-4 rounded border border-[#00FF41]/20 mb-4">
                    <p className="text-sm text-[#00FFFF] leading-relaxed">
                      {analysis.findings}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    {analysis.issues.map((issue, issueIdx) => (
                      <div 
                        key={issueIdx}
                        className="flex items-start gap-3 p-3 bg-[#0a0e1a]/50 rounded border-l-2 border-current"
                        style={{
                          borderLeftColor: 
                            issue.type === 'error' ? '#FF6B6B' : 
                            issue.type === 'warning' ? '#FFA500' : '#4ECDC4'
                        }}
                      >
                        <Badge 
                          variant="outline" 
                          className={`mt-1 ${
                            issue.type === 'error' ? 'text-[#FF6B6B] border-[#FF6B6B]' :
                            issue.type === 'warning' ? 'text-[#FFA500] border-[#FFA500]' :
                            'text-[#4ECDC4] border-[#4ECDC4]'
                          }`}
                        >
                          L:{issue.line}
                        </Badge>
                        <p className="text-sm text-[#00FF41] flex-1">{issue.desc}</p>
                      </div>
                    ))}
                  </div>

                  {idx < detailedAnalysis.length - 1 && <Separator className="my-6 bg-[#00FF41]/20" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="bg-[#0d1117] border-[#00FFFF]/30">
        <CardHeader>
          <CardTitle className="text-[#00FFFF] flex items-center gap-2">
            <Icon name="Lightbulb" className="w-5 h-5" />
            Понимание кода
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#0a0e1a] p-4 rounded border border-[#00FFFF]/20">
            <h4 className="text-[#00FF41] font-semibold mb-2">Назначение кода:</h4>
            <p className="text-sm text-[#00FFFF] leading-relaxed">
              Данный код реализует систему управления пользователями с аутентификацией. 
              Основные функции включают регистрацию, авторизацию, управление сессиями и 
              обработку платежей через внешний API.
            </p>
          </div>

          <div className="bg-[#0a0e1a] p-4 rounded border border-[#00FFFF]/20">
            <h4 className="text-[#00FF41] font-semibold mb-2">Основные компоненты:</h4>
            <ul className="text-sm text-[#00FFFF] space-y-2">
              <li className="flex items-start gap-2">
                <Icon name="ChevronRight" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>UserManager</strong> - управление данными пользователей в базе данных</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="ChevronRight" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>AuthService</strong> - проверка учётных данных и создание сессий</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="ChevronRight" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>PaymentProcessor</strong> - интеграция с платёжным шлюзом</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="ChevronRight" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>DiscountEngine</strong> - расчёт скидок (не реализовано)</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPanel;
