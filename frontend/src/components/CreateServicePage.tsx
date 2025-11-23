import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Tag, Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "./ui/select";

interface CreateServicePageProps {
  onBack: () => void;
  onCreate: (serviceData: any) => void;
}

export default function CreateServicePage({ onBack, onCreate }: CreateServicePageProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [timeAvg, setTimeAvg] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [allowCoupon, setAllowCoupon] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([]);

  // Handle image preview
  const handleImageUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const serviceData = {
      id: crypto.randomUUID(),
      name,
      category,
      description,
      price,
      duration,
      timeAvg,
      location,
      availability,
      tags,
      allowCoupon,
      image,
    };

    onCreate(serviceData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="min-h-screen bg-background px-6 py-10"
    >
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-semibold">Criar novo serviço</h1>
        </div>

        {/* Form */}
        <Card className="p-6 space-y-6 bg-card/60 backdrop-blur-sm border-border">

          {/* Name */}
          <div>
            <Label className="text-sm font-medium">Nome da empresa</Label>
            <Input value={name} onChange={e => setName(e.target.value)}  />
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm font-medium">Descrição da empresa</Label>
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              
              className="min-h-[110px]"
            />
          </div>

          {/* Category */}
          <div>
            <Label className="text-sm font-medium">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>

                <SelectContent>
                <SelectItem value="consultas-medicas">Consultas Médicas</SelectItem>
                <SelectItem value="beleza-estetica">Beleza & Estética</SelectItem>
                <SelectItem value="assistencia-tecnica">Assistência Técnica</SelectItem>
                <SelectItem value="aulas-particulares">Aulas Particulares</SelectItem>
                <SelectItem value="bem-estar">Bem-estar</SelectItem>
                <SelectItem value="automotivo">Automotivo</SelectItem>
                </SelectContent>
            </Select>
            </div>

          {/* Location */}
          <div>
            <Label className="text-sm font-medium">Local do atendimento</Label>
            <Input
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>

          {/* Availability */}
          <div>
            <Label className="text-sm font-medium">Disponibilidade geral</Label>
            <Input
              value={availability}
              onChange={e => setAvailability(e.target.value)}
              placeholder="Ex: Seg a Sex - 10h às 18h"
            />
          </div>

          {/* Tags */}
          <div>
            <Label className="text-sm font-medium">Tags / Especialidades</Label>

            <div className="flex gap-2 mt-2">
              <Input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                placeholder="Ex: barba, infantil..."
              />
              <Button onClick={handleAddTag}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((t, i) => (
                <Badge key={i} variant="secondary" className="flex items-center gap-2">
                  {t}
                  <Trash
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleRemoveTag(i)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* --- "Adicionar Serviço" --- */}
        <div className="border border-border rounded-lg p-4 bg-background/60 space-y-4">
        <h3 className="text-lg font-semibold">Adicionar serviço</h3>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
            <Label className="text-sm font-medium">Nome do serviço</Label>
            <Input value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div>
            <Label className="text-sm font-medium">Preço</Label>
            <Input value={price} onChange={e => setPrice(e.target.value)} placeholder="Ex: R$ 120,00" />
            </div>
        </div>

        <div>
            <Label className="text-sm font-medium">Descrição do serviço</Label>
            <Textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="min-h-[90px]"
            />
        </div>

        <div>
            <Label className="text-sm font-medium">Duração (minutos)</Label>
            <Input value={duration} onChange={e => setDuration(e.target.value)} placeholder="Ex: 45" />
        </div>

        {/* Ações: adicionar (empilha na lista) e limpar */}
        <div className="flex gap-3">
            <Button
            onClick={() => {
                // validação mínima
                if (!name.trim()) return alert("Preencha o nome do serviço.");
                // cria o objeto do serviço
                const newService = {
                id: crypto?.randomUUID?.() ?? Date.now().toString(),
                name: name.trim(),
                description: description.trim(),
                price: price.trim(),
                duration: duration.trim(),
                };
                // adiciona à lista
                setServices(prev => [...prev, newService]);
                // limpa campos para o próximo serviço
                setName("");
                setDescription("");
                setPrice("");
                setDuration("");
            }}
            className="bg-gradient-to-r from-primary to-emerald-600 text-white px-4 py-3"
            >
            Adicionar serviço
            </Button>

            <Button
            variant="outline"
            onClick={() => {
                setName("");
                setDescription("");
                setPrice("");
                setDuration("");
            }}
            >
            Limpar
            </Button>
        </div>

        {/* Lista dos serviços adicionados (preview) */}
        <div className="pt-4 space-y-3">
            <h4 className="text-sm font-medium">Serviços adicionados</h4>

            {services.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum serviço adicionado ainda.</p>
            )}

            <div className="space-y-2">
            {services.map((s) => (
                <Card key={s.id} className="p-3 flex items-start justify-between gap-3">
                <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-sm text-muted-foreground">{s.description}</div>
                    <div className="text-sm mt-1">Preço: {s.price} • Duração: {s.duration} min</div>
                </div>

                <div className="flex flex-col gap-2">
                    <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                        setServices(prev => prev.filter(x => x.id !== s.id));
                    }}
                    >
                    Remover
                    </Button>
                </div>
                </Card>
            ))}
            </div>
        </div>
        </div>



          {/* Allow Coupon */}
          <div className="flex items-center justify-between border border-border rounded-lg p-4">
            <div>
              <p className="font-medium">Permitir uso de cupom</p>
              <p className="text-sm text-muted-foreground">Clientes podem aplicar cupons nesse serviço</p>
            </div>
            <Switch checked={allowCoupon} onCheckedChange={setAllowCoupon} />
          </div>

          {/* Image Upload */}
          <div>
            <Label className="text-sm font-medium">Imagem de capa</Label>

            <div className="mt-2">
              <label className="w-full h-40 border border-border rounded-lg cursor-pointer flex items-center justify-center bg-muted/20 hover:bg-muted/30 transition">
                {image ? (
                  <img
                    src={image}
                    className="w-full h-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Upload className="w-6 h-6 mb-2" />
                    Selecionar imagem
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <Button
            className="w-full mt-6 bg-gradient-to-r from-primary to-emerald-600"
            onClick={handleSubmit}
          >
            Criar serviço
          </Button>

        </Card>
      </div>
    </motion.div>
  );
}
