import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeAnalyzer from "@/components/CodeAnalyzer";
import ReportsPanel from "@/components/ReportsPanel";
import FixesPanel from "@/components/FixesPanel";
import HistoryPanel from "@/components/HistoryPanel";
import SettingsPanel from "@/components/SettingsPanel";
import DocsPanel from "@/components/DocsPanel";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeTab, setActiveTab] = useState("analyzer");

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#00FF41] p-2 md:p-4">
      <header className="mb-4 md:mb-6 border-b border-[#00FF41]/30 pb-3 md:pb-4">
        <div className="flex items-center gap-2 md:gap-3 mb-2">
          <Icon name="Terminal" className="w-6 h-6 md:w-8 md:h-8 text-[#00FF41] flex-shrink-0" />
          <h1 className="text-lg md:text-3xl font-bold terminal-glow">AI CODE ANALYZER</h1>
        </div>
        <p className="text-[#00FFFF] text-xs md:text-sm ml-8 md:ml-11">
          &gt; Множественная проверка кода с 5+ AI моделей
        </p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto -mx-2 px-2 mb-4 md:mb-6">
          <TabsList className="inline-flex gap-1 md:gap-2 bg-[#0d1117] border border-[#00FF41]/30 p-1 min-w-max">
            <TabsTrigger 
              value="analyzer" 
              className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-[#0a0e1a] text-[#00FF41] text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5 whitespace-nowrap"
            >
              <Icon name="Search" className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Анализатор</span>
            </TabsTrigger>
            <TabsTrigger 
              value="reports"
              className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-[#0a0e1a] text-[#00FF41] text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5 whitespace-nowrap"
            >
              <Icon name="FileText" className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Отчёты</span>
            </TabsTrigger>
            <TabsTrigger 
              value="fixes"
              className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-[#0a0e1a] text-[#00FF41] text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5 whitespace-nowrap"
            >
              <Icon name="Wrench" className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Исправления</span>
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-[#0a0e1a] text-[#00FF41] text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5 whitespace-nowrap"
            >
              <Icon name="History" className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">История</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-[#0a0e1a] text-[#00FF41] text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5 whitespace-nowrap"
            >
              <Icon name="Settings" className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Настройки</span>
            </TabsTrigger>
            <TabsTrigger 
              value="docs"
              className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-[#0a0e1a] text-[#00FF41] text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5 whitespace-nowrap"
            >
              <Icon name="Book" className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Документация</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="analyzer">
          <CodeAnalyzer />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsPanel />
        </TabsContent>

        <TabsContent value="fixes">
          <FixesPanel />
        </TabsContent>

        <TabsContent value="history">
          <HistoryPanel />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsPanel />
        </TabsContent>

        <TabsContent value="docs">
          <DocsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;