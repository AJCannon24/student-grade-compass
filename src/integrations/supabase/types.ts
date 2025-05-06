export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      courses: {
        Row: {
          code: string | null
          department: string | null
          id: number
          units: number | null
        }
        Insert: {
          code?: string | null
          department?: string | null
          id?: number
          units?: number | null
        }
        Update: {
          code?: string | null
          department?: string | null
          id?: number
          units?: number | null
        }
        Relationships: []
      }
      GradeDistro: {
        Row: {
          A: string
          B: string
          C: string
          Course: string
          created_at: string
          D: string
          Department: string
          EW: string
          F: string
          id: number
          Instructor: string
          IX: string
          NP: string
          P: string
          RD: string
          Section: string
          Total: string
          W: string
        }
        Insert: {
          A: string
          B: string
          C: string
          Course: string
          created_at?: string
          D: string
          Department: string
          EW: string
          F: string
          id?: number
          Instructor: string
          IX: string
          NP: string
          P: string
          RD: string
          Section: string
          Total: string
          W: string
        }
        Update: {
          A?: string
          B?: string
          C?: string
          Course?: string
          created_at?: string
          D?: string
          Department?: string
          EW?: string
          F?: string
          id?: number
          Instructor?: string
          IX?: string
          NP?: string
          P?: string
          RD?: string
          Section?: string
          Total?: string
          W?: string
        }
        Relationships: []
      }
      gradestats: {
        Row: {
          a: number | null
          b: number | null
          c: number | null
          course_id: number | null
          d: number | null
          ew: number | null
          f: number | null
          id: number
          ix: number | null
          np: number | null
          p: number | null
          professor_id: number | null
          rd: number | null
          term: string | null
          total_students: number | null
          w: number | null
        }
        Insert: {
          a?: number | null
          b?: number | null
          c?: number | null
          course_id?: number | null
          d?: number | null
          ew?: number | null
          f?: number | null
          id?: number
          ix?: number | null
          np?: number | null
          p?: number | null
          professor_id?: number | null
          rd?: number | null
          term?: string | null
          total_students?: number | null
          w?: number | null
        }
        Update: {
          a?: number | null
          b?: number | null
          c?: number | null
          course_id?: number | null
          d?: number | null
          ew?: number | null
          f?: number | null
          id?: number
          ix?: number | null
          np?: number | null
          p?: number | null
          professor_id?: number | null
          rd?: number | null
          term?: string | null
          total_students?: number | null
          w?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gradestats_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gradestats_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "professors"
            referencedColumns: ["id"]
          },
        ]
      }
      professors: {
        Row: {
          department: string | null
          id: number
          name: string | null
        }
        Insert: {
          department?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          department?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          course_id: number | null
          created_at: string | null
          id: number
          professor_id: number | null
          rating_difficulty: number | null
          rating_engagement: number | null
          rating_overall: number | null
          tags: string[] | null
          user_id: string | null
          would_take_again: boolean | null
        }
        Insert: {
          comment?: string | null
          course_id?: number | null
          created_at?: string | null
          id?: number
          professor_id?: number | null
          rating_difficulty?: number | null
          rating_engagement?: number | null
          rating_overall?: number | null
          tags?: string[] | null
          user_id?: string | null
          would_take_again?: boolean | null
        }
        Update: {
          comment?: string | null
          course_id?: number | null
          created_at?: string | null
          id?: number
          professor_id?: number | null
          rating_difficulty?: number | null
          rating_engagement?: number | null
          rating_overall?: number | null
          tags?: string[] | null
          user_id?: string | null
          would_take_again?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "professors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
