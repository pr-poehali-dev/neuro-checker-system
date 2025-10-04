import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface Fix {
  id: string;
  line: number;
  type: "error" | "warning" | "info";
  title: string;
  current: string;
  proposed: string;
  selected: boolean;
  verified: boolean;
  aiModel: string;
}

const FixesPanel = () => {
  const [fixes, setFixes] = useState<Fix[]>([
    {
      id: "1",
      line: 42,
      type: "error",
      title: "SQL injection уязвимость",
      current: 'query = "SELECT * FROM users WHERE id=" + userId',
      proposed: 'query = "SELECT * FROM users WHERE id=?"; params = [userId]',
      selected: true,
      verified: true,
      aiModel: "GPT-4 Turbo"
    },
    {
      id: "2",
      line: 89,
      type: "error",
      title: "Незащищённое хранение паролей",
      current: 'db.save({password: password})',
      proposed: 'db.save({password: bcrypt.hash(password, 10)})',
      selected: true,
      verified: true,
      aiModel: "Claude 3 Opus"
    },
    {
      id: "3",
      line: 23,
      type: "warning",
      title: "Неиспользуемая функция",
      current: 'function calculateDiscount() { /* 50 строк кода */ }',
      proposed: '// Функция удалена - нигде не используется',
      selected: false,
      verified: true,
      aiModel: "Gemini Pro"
    },
    {
      id: "4",
      line: 178,
      type: "warning",
      title: "Неэффективный алгоритм O(n²)",
      current: 'for(i) { for(j) { compare(i,j) } }',
      proposed: 'items.sort(); // O(n log n) вместо O(n²)',
      selected: true,
      verified: true,
      aiModel: "Mistral Large"
    }
  ]);

  const [fixing, setFixing] = useState(false);
  const [fixProgress, setFixProgress] = useState(0);

  const toggleFix = (id: string) => {
    setFixes(prev => prev.map(fix => 
      fix.id === id ? { ...fix, selected: !fix.selected } : fix
    ));
  };

  const selectAll = () => {
    setFixes(prev => prev.map(fix => ({ ...fix, selected: true })));
  };

  const deselectAll = () => {
    setFixes(prev => prev.map(fix => ({ ...fix, selected: false })));
  };

  const applyFixes = async () => {
    const selectedFixes = fixes.filter(f => f.selected);
    if (selectedFixes.length === 0) {
      toast.error("Выберите исправления для применения");
      return;
    }

    setFixing(true);
    setFixProgress(0);

    for (let i = 0; i < selectedFixes.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFixProgress(((i + 1) / selectedFixes.length) * 100);
      toast.info(`Исправление ${i + 1}/${selectedFixes.length}: ${selectedFixes[i].title}`);
    }

    setFixing(false);
    toast.success(`Успешно применено ${selectedFixes.length} исправлений!`);
    setFixes(prev => prev.filter(f => !f.selected));
  };

  const selectedCount = fixes.filter(f => f.selected).length;
  const errorCount = fixes.filter(f => f.type === "error").length;
  const warningCount = fixes.filter(f => f.type === "warning").length;

  return (
    <div className="space-y-6">
      <Card className="bg-[#0d1117] border-[#00FF41]/30">
        <CardHeader>
          <CardTitle className="text-[#00FF41] flex items-center gap-2">
            <Icon name="Wrench" className="w-5 h-5" />
            Предлагаемые исправления
          </CardTitle>
          <CardDescription className="text-[#00FFFF]">
            Выберите исправления для автоматического применения
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="flex flex-wrap gap-2 md:gap-3">
              <Badge variant="outline" className="text-[#FF6B6B] border-[#FF6B6B] text-xs">
                {errorCount} ошибок
              </Badge>
              <Badge variant="outline" className="text-[#FFA500] border-[#FFA500] text-xs">
                {warningCount} предупреждений
              </Badge>
              <Badge variant="outline" className="text-[#00FFFF] border-[#00FFFF] text-xs">
                {selectedCount} выбрано
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={selectAll}
                className="text-[#00FF41] border-[#00FF41] flex-1 md:flex-none text-xs"
              >
                Выбрать все
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={deselectAll}
                className="text-[#00FFFF] border-[#00FFFF] flex-1 md:flex-none text-xs"
              >
                Снять все
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[400px] md:h-[500px] pr-2 md:pr-4">
            <div className="space-y-4">
              {fixes.map((fix) => (
                <div
                  key={fix.id}
                  className={`p-3 md:p-4 rounded border-2 ${
                    fix.selected 
                      ? 'border-[#00FF41] bg-[#00FF41]/5' 
                      : 'border-[#00FF41]/20 bg-[#0a0e1a]'
                  }`}
                >
                  <div className="flex items-start gap-2 md:gap-3 mb-3">
                    <Checkbox
                      checked={fix.selected}
                      onCheckedChange={() => toggleFix(fix.id)}
                      className="mt-1 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            fix.type === 'error' 
                              ? 'text-[#FF6B6B] border-[#FF6B6B]' 
                              : fix.type === 'warning'
                              ? 'text-[#FFA500] border-[#FFA500]'
                              : 'text-[#4ECDC4] border-[#4ECDC4]'
                          }`}
                        >
                          {fix.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-[#00FFFF] border-[#00FFFF] text-xs">
                          L:{fix.line}
                        </Badge>
                        {fix.verified && (
                          <Badge variant="outline" className="text-[#00FF41] border-[#00FF41] text-xs hidden md:flex">
                            <Icon name="CheckCircle2" className="w-3 h-3 mr-1" />
                            Проверено
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-[#00FFFF]/60 border-[#00FFFF]/30 text-xs hidden md:inline-flex">
                          {fix.aiModel}
                        </Badge>
                      </div>
                      <h4 className="text-[#00FF41] font-semibold mb-2 md:mb-3 text-sm md:text-base break-words">{fix.title}</h4>
                      
                      <div className="space-y-2">
                        <div className="bg-[#0a0e1a] p-2 md:p-3 rounded border border-[#FF6B6B]/30">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="X" className="w-3 h-3 md:w-4 md:h-4 text-[#FF6B6B] flex-shrink-0" />
                            <span className="text-xs text-[#FF6B6B]">Текущий код:</span>
                          </div>
                          <code className="text-xs md:text-sm text-[#00FF41] font-mono break-all">{fix.current}</code>
                        </div>
                        
                        <div className="bg-[#0a0e1a] p-2 md:p-3 rounded border border-[#00FF41]/30">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="Check" className="w-3 h-3 md:w-4 md:h-4 text-[#00FF41] flex-shrink-0" />
                            <span className="text-xs text-[#00FF41]">Предлагаемое исправление:</span>
                          </div>
                          <code className="text-xs md:text-sm text-[#00FFFF] font-mono break-all">{fix.proposed}</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="bg-[#0d1117] border-[#00FF41]/30">
        <CardContent className="pt-4 md:pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Info" className="w-4 h-4 md:w-5 md:h-5 text-[#00FFFF] flex-shrink-0" />
              <span className="text-[#00FFFF] text-sm md:text-base">
                {selectedCount > 0 
                  ? `Готово к применению ${selectedCount} исправлений` 
                  : "Выберите исправления для применения"}
              </span>
            </div>
            <Button
              onClick={applyFixes}
              disabled={fixing || selectedCount === 0}
              className="bg-[#00FF41] text-[#0a0e1a] hover:bg-[#00FF41]/80 w-full md:w-auto text-sm md:text-base"
            >
              {fixing ? (
                <>
                  <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Применение...
                </>
              ) : (
                <>
                  <Icon name="Zap" className="w-4 h-4 mr-2" />
                  Применить исправления
                </>
              )}
            </Button>
          </div>

          {fixing && (
            <div className="space-y-2">
              <Progress value={fixProgress} className="h-2 bg-[#0a0e1a]" />
              <p className="text-sm text-[#00FFFF] text-center">
                {Math.round(fixProgress)}% завершено
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FixesPanel;