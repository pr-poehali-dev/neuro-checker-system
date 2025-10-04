import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface AnalysisResult {
  id: string;
  analyzer: string;
  status: 'analyzing' | 'complete' | 'error';
  issues: Issue[];
  summary: string;
}

interface Issue {
  id: string;
  line: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
  selected: boolean;
}

const ANALYZERS = [
  { id: 'security', name: 'Security Analyzer', icon: 'Shield' },
  { id: 'performance', name: 'Performance Analyzer', icon: 'Zap' },
  { id: 'best-practices', name: 'Best Practices', icon: 'BookOpen' },
  { id: 'logic', name: 'Logic Analyzer', icon: 'Brain' },
  { id: 'documentation', name: 'Documentation', icon: 'FileText' }
];

const CodeAnalyzer = () => {
  const [code, setCode] = useState(`function example() {\n  var x = 10;\n  console.log(x);\n  return x;\n}`);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('editor');

  const simulateAnalysis = async () => {
    setAnalyzing(true);
    setSelectedTab('analysis');
    
    const newResults: AnalysisResult[] = ANALYZERS.map(analyzer => ({
      id: analyzer.id,
      analyzer: analyzer.name,
      status: 'analyzing' as const,
      issues: [],
      summary: ''
    }));
    
    setResults(newResults);

    for (let i = 0; i < ANALYZERS.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockIssues: Issue[] = [
        {
          id: `${ANALYZERS[i].id}-1`,
          line: 2,
          severity: 'warning',
          message: `[${ANALYZERS[i].name}] Используется var вместо let/const`,
          suggestion: 'Замените var на const или let для улучшения области видимости',
          selected: true
        },
        {
          id: `${ANALYZERS[i].id}-2`,
          line: 3,
          severity: 'info',
          message: `[${ANALYZERS[i].name}] Console.log в production коде`,
          suggestion: 'Удалите console.log или используйте logger',
          selected: true
        }
      ];

      setResults(prev => prev.map(r => 
        r.id === ANALYZERS[i].id 
          ? { 
              ...r, 
              status: 'complete', 
              issues: mockIssues,
              summary: `Проверка завершена. Найдено: ${mockIssues.length} проблем` 
            }
          : r
      ));
    }

    setAnalyzing(false);
    toast.success('Анализ завершён! Найдено проблем: ' + (ANALYZERS.length * 2));
  };

  const toggleIssue = (analyzerId: string, issueId: string) => {
    setResults(prev => prev.map(r => 
      r.id === analyzerId
        ? {
            ...r,
            issues: r.issues.map(issue =>
              issue.id === issueId ? { ...issue, selected: !issue.selected } : issue
            )
          }
        : r
    ));
  };

  const fixSelectedIssues = () => {
    const selectedIssues = results.flatMap(r => r.issues.filter(i => i.selected));
    if (selectedIssues.length === 0) {
      toast.error('Выберите проблемы для исправления');
      return;
    }
    
    toast.success(`Исправляем ${selectedIssues.length} проблем...`);
    
    setTimeout(() => {
      setCode(`function example() {\n  const x = 10;\n  // Removed console.log\n  return x;\n}`);
      toast.success('Код успешно исправлен!');
      setResults([]);
      setSelectedTab('editor');
    }, 2000);
  };

  const totalIssues = results.reduce((acc, r) => acc + r.issues.length, 0);
  const selectedCount = results.reduce((acc, r) => acc + r.issues.filter(i => i.selected).length, 0);

  return (
    <div className="space-y-4">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <div className="overflow-x-auto -mx-2 px-2">
          <TabsList className="bg-[#1A1F2C] border border-[#00FF41] inline-flex min-w-max">
            <TabsTrigger value="editor" className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-black text-xs md:text-sm px-3 md:px-4">
              <Icon name="Code" className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Редактор</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-black text-xs md:text-sm px-3 md:px-4">
              <Icon name="Activity" className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Анализ ({totalIssues})</span>
              <span className="md:hidden">({totalIssues})</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-black text-xs md:text-sm px-3 md:px-4">
              <Icon name="History" className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">История</span>
            </TabsTrigger>
          </TabsList>
        </div>

          <TabsContent value="editor" className="space-y-4">
            <Card className="bg-[#1A1F2C] border-[#00FF41] p-3 md:p-6">
              <div className="mb-3 md:mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h2 className="text-base md:text-xl font-semibold text-[#00FF41]">{'>'} Код для анализа</h2>
                <Button 
                  onClick={simulateAnalysis} 
                  disabled={analyzing}
                  className="bg-[#00FF41] text-black hover:bg-[#00DD33] w-full md:w-auto text-sm md:text-base py-2.5 md:py-2"
                >
                  {analyzing ? (
                    <>
                      <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                      Анализируем...
                    </>
                  ) : (
                    <>
                      <Icon name="Play" className="w-4 h-4 mr-2" />
                      Запустить анализ
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[300px] md:min-h-[400px] font-mono text-xs md:text-sm bg-[#0a0e1a] border-[#00FF41] text-[#00FF41] focus:ring-[#00FF41]"
                placeholder="Вставьте код для анализа..."
              />
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            {results.length === 0 ? (
              <Card className="bg-[#1A1F2C] border-[#00FF41] p-12 text-center">
                <Icon name="Search" className="w-16 h-16 mx-auto mb-4 text-[#4ECDC4]" />
                <p className="text-[#4ECDC4]">Запустите анализ для просмотра результатов</p>
              </Card>
            ) : (
              <>
                <div className="overflow-x-auto -mx-2 md:mx-0">
                  <div className="flex md:grid md:grid-cols-5 gap-3 md:gap-4 px-2 md:px-0 pb-2 md:pb-0 min-w-max md:min-w-0">
                    {ANALYZERS.map((analyzer, idx) => {
                      const result = results.find(r => r.id === analyzer.id);
                      return (
                        <Card key={analyzer.id} className="bg-[#1A1F2C] border-[#00FF41] p-3 md:p-4 min-w-[200px] md:min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name={analyzer.icon as any} className="w-4 h-4 md:w-5 md:h-5 text-[#00FF41] flex-shrink-0" />
                            <h3 className="text-xs md:text-sm font-semibold text-[#00FF41]">{analyzer.name}</h3>
                          </div>
                          {result?.status === 'analyzing' && (
                            <div className="flex items-center gap-2">
                              <Icon name="Loader2" className="w-4 h-4 animate-spin text-[#4ECDC4]" />
                              <span className="text-xs text-[#4ECDC4]">Проверка {idx + 1}/3...</span>
                            </div>
                          )}
                          {result?.status === 'complete' && (
                            <p className="text-xs text-[#4ECDC4]">{result.issues.length} проблем</p>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <Card className="bg-[#1A1F2C] border-[#00FF41] p-3 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 md:mb-6">
                    <h2 className="text-base md:text-xl font-semibold text-[#00FF41]">
                      {'>'} Найденные проблемы ({selectedCount}/{totalIssues} выбрано)
                    </h2>
                    <Button 
                      onClick={fixSelectedIssues}
                      disabled={selectedCount === 0}
                      className="bg-[#00FF41] text-black hover:bg-[#00DD33] w-full md:w-auto text-sm md:text-base"
                    >
                      <Icon name="Wrench" className="w-4 h-4 mr-2" />
                      Исправить выбранные
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {results.map(result => (
                      <div key={result.id} className="space-y-3">
                        {result.issues.map(issue => (
                          <div 
                            key={issue.id} 
                            className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0e1a] border border-[#00FF41]/30 rounded"
                          >
                            <Checkbox
                              checked={issue.selected}
                              onCheckedChange={() => toggleIssue(result.id, issue.id)}
                              className="mt-1 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                                  issue.severity === 'error' ? 'bg-[#FF6B6B] text-white' :
                                  issue.severity === 'warning' ? 'bg-[#FFA500] text-black' :
                                  'bg-[#4ECDC4] text-black'
                                }`}>
                                  {issue.severity.toUpperCase()}
                                </span>
                                <span className="text-xs text-[#4ECDC4]">Строка {issue.line}</span>
                              </div>
                              <p className="text-[#00FF41] mb-2 text-sm md:text-base break-words">{issue.message}</p>
                              <p className="text-xs md:text-sm text-[#4ECDC4] break-words">
                                <Icon name="Lightbulb" className="w-4 h-4 inline mr-1 flex-shrink-0" />
                                {issue.suggestion}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-[#1A1F2C] border-[#00FF41] p-12 text-center">
              <Icon name="Clock" className="w-16 h-16 mx-auto mb-4 text-[#4ECDC4]" />
              <p className="text-[#4ECDC4]">История анализов будет отображаться здесь</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CodeAnalyzer;