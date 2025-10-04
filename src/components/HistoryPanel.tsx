import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HistoryItem {
  id: string;
  timestamp: string;
  codeLines: number;
  issuesFound: number;
  issuesFixed: number;
  duration: string;
  status: "success" | "partial" | "failed";
}

const HistoryPanel = () => {
  const history: HistoryItem[] = [
    {
      id: "1",
      timestamp: "2025-10-04 14:23:15",
      codeLines: 245,
      issuesFound: 12,
      issuesFixed: 10,
      duration: "3m 42s",
      status: "success"
    },
    {
      id: "2",
      timestamp: "2025-10-04 11:15:42",
      codeLines: 189,
      issuesFound: 8,
      issuesFixed: 8,
      duration: "2m 18s",
      status: "success"
    },
    {
      id: "3",
      timestamp: "2025-10-03 16:45:20",
      codeLines: 512,
      issuesFound: 23,
      issuesFixed: 18,
      duration: "5m 56s",
      status: "partial"
    },
    {
      id: "4",
      timestamp: "2025-10-03 09:30:05",
      codeLines: 98,
      issuesFound: 3,
      issuesFixed: 3,
      duration: "1m 24s",
      status: "success"
    },
    {
      id: "5",
      timestamp: "2025-10-02 14:12:33",
      codeLines: 367,
      issuesFound: 15,
      issuesFixed: 12,
      duration: "4m 15s",
      status: "partial"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-[#00FF41] border-[#00FF41]";
      case "partial": return "text-[#FFA500] border-[#FFA500]";
      case "failed": return "text-[#FF6B6B] border-[#FF6B6B]";
      default: return "text-[#00FFFF] border-[#00FFFF]";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return "CheckCircle2";
      case "partial": return "AlertCircle";
      case "failed": return "XCircle";
      default: return "Circle";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "success": return "Успешно";
      case "partial": return "Частично";
      case "failed": return "Ошибка";
      default: return "Неизвестно";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#0d1117] border-[#00FF41]/30">
        <CardHeader>
          <CardTitle className="text-[#00FF41] flex items-center gap-2">
            <Icon name="History" className="w-5 h-5" />
            История проверок и исправлений
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#0a0e1a] p-4 rounded border border-[#00FF41]/20">
              <div className="text-2xl font-bold text-[#00FF41]">{history.length}</div>
              <div className="text-xs text-[#00FFFF]">Всего проверок</div>
            </div>
            <div className="bg-[#0a0e1a] p-4 rounded border border-[#00FF41]/20">
              <div className="text-2xl font-bold text-[#00FF41]">
                {history.reduce((sum, h) => sum + h.issuesFound, 0)}
              </div>
              <div className="text-xs text-[#00FFFF]">Найдено проблем</div>
            </div>
            <div className="bg-[#0a0e1a] p-4 rounded border border-[#00FF41]/20">
              <div className="text-2xl font-bold text-[#00FF41]">
                {history.reduce((sum, h) => sum + h.issuesFixed, 0)}
              </div>
              <div className="text-xs text-[#00FFFF]">Исправлено</div>
            </div>
          </div>

          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {history.map((item, idx) => (
                <Card key={item.id} className="bg-[#0a0e1a] border-[#00FF41]/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#0d1117] p-2 rounded">
                          <Icon name="Code2" className="w-5 h-5 text-[#00FF41]" />
                        </div>
                        <div>
                          <div className="text-[#00FF41] font-semibold">
                            Проверка #{history.length - idx}
                          </div>
                          <div className="text-xs text-[#00FFFF] flex items-center gap-2">
                            <Icon name="Clock" className="w-3 h-3" />
                            {item.timestamp}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(item.status)}>
                        <Icon name={getStatusIcon(item.status)} className="w-3 h-3 mr-1" />
                        {getStatusText(item.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Icon name="FileCode2" className="w-4 h-4 text-[#00FFFF]" />
                        <div>
                          <div className="text-xs text-[#00FFFF]/60">Строк кода</div>
                          <div className="text-sm text-[#00FF41] font-semibold">
                            {item.codeLines}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Icon name="Search" className="w-4 h-4 text-[#FFA500]" />
                        <div>
                          <div className="text-xs text-[#00FFFF]/60">Найдено</div>
                          <div className="text-sm text-[#00FF41] font-semibold">
                            {item.issuesFound}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Icon name="Wrench" className="w-4 h-4 text-[#00FF41]" />
                        <div>
                          <div className="text-xs text-[#00FFFF]/60">Исправлено</div>
                          <div className="text-sm text-[#00FF41] font-semibold">
                            {item.issuesFixed}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Icon name="Timer" className="w-4 h-4 text-[#00FFFF]" />
                        <div>
                          <div className="text-xs text-[#00FFFF]/60">Время</div>
                          <div className="text-sm text-[#00FF41] font-semibold">
                            {item.duration}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[#00FFFF] border-[#00FFFF]/30 hover:bg-[#00FFFF]/10"
                      >
                        <Icon name="Eye" className="w-3 h-3 mr-1" />
                        Подробнее
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[#00FF41] border-[#00FF41]/30 hover:bg-[#00FF41]/10"
                      >
                        <Icon name="Download" className="w-3 h-3 mr-1" />
                        Отчёт
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="bg-[#0d1117] border-[#00FFFF]/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Icon name="TrendingUp" className="w-5 h-5 text-[#00FFFF]" />
            <div>
              <div className="text-[#00FFFF] font-semibold">Прогресс качества кода</div>
              <div className="text-sm text-[#00FFFF]/60">
                Среднее количество проблем уменьшилось на 34% за последние 5 проверок
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPanel;
